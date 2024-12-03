import { ServerChannel } from "@geckos.io/server";
import * as Types from "../../types.js";
import utilities from "../../utilities/index.js";

/**
 * This is an instance of a player that is tied
 * to a match
 */
export default class Player {

    id: string
    socket: ServerChannel
    match: Types.MATCH

    constructor (id: string, socket: ServerChannel, match: Types.MATCH) {
        this.id = id;
        this.socket = socket;
        this.match = match;

        this.created();
    }

    /**
     * Created event, called when this class is instantiated
     */
    created () : void {
        utilities.logger.success(`Player ${this.id} was successfully created.`);
    }

    /**
     * Update method
     */
    update (delta: number) : Types.PLAYER_DATA {
        return this.data();
    }

    /**
     * Do all cleanup logic here
     */
    cleanup () : void {
        utilities.logger.info(`Cleanup method called for player: ${this.id}`);
    }

    /**
     * Returns information about the player
     * @returns { Types.PLAYER_DATA }
     */
    data () : Types.PLAYER_DATA {
        return {
            id: this.id
        }
    }
}