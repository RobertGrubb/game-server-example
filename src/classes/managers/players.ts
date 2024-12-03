import { ServerChannel } from "@geckos.io/server";
import utilities from "../../utilities/index.js";
import Match from "../instances/match.js";
import Player from "../prefabs/player.js";
import * as Types from "../../types.js";

/**
 * This class will hold all player instances
 */
export default class PlayerManager {

    match: Match
    players: Array<Player>

    /**
     * Instantiates a new PlayerManager instance for 
     * the specified match.
     * @param { Match } match The match instance
     */
    constructor (match: Match) {
        this.match = match;
        this.players = [];

        utilities.logger.info(`PlayersManager instantiated for match ${this.match.id}`);
    }

    /**
     * Iterate through each player and call the update method.
     * @param { number } delta Passed from the game loop method
     */
    update (delta : number) : void {
        for (let i = 0; i < this.players.length; i++) {
            const data: Types.PLAYER_DATA = this.players[i].update(delta);
            this.match.snapshot.update("players", data.id, data);
        }
    }

    /**
     * Creates a new player instance, adds it to the pool, and returns it
     * @returns { Player } The player instance
     */
    create (socket: ServerChannel) : Player {
        const playerId: string = socket.userData?.username;
        const player = new Player(playerId, socket, this.match);
        this.players.push(player);
        return player;
    }

    /**
     * Checks if a player exists by it's id
     * @param {string} id The id of the player
     * @returns {boolean} Returns if the player exists or not
     */
    exists (id: string) : boolean {
        if (this.get(id)) {
            return true;
        }

        return false;
    }

    /**
     * Returns the instance for a player if applicable
     * @param {string} id The player id
     * @returns { null | { key: number, instance: Player } } 
     */
    get (id: string) : null | { key: number, instance: Player } {
        const key = this.players.findIndex((p: Player) => p.id === id);

        if (key == -1) {
            return null;
        }

        return {
            key: key,
            instance: this.players[key]
        };
    }

    /**
     * Removes a player from the players pool
     * @param {string} id The player id
     * @returns {boolean}
     */
    remove (id: string | undefined) : boolean {
        if (!id) return false;

        /**
         * Validate that the player exists in the pool
         */
        const player = this.get(id);
        if (!player) {
            utilities.logger.error(`Player removal attempt on id: ${id}, but was not found...`);
            return false;
        }

        /**
         * Run cleanup on the player then remove
         */
        player.instance.cleanup();
        this.players.splice(player.key, 1);
        utilities.logger.success(`Player ${id} was removed successfully.`);

        return true;
    }
}