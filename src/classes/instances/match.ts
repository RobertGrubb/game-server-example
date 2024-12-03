import { GeckosServer, ServerChannel } from "@geckos.io/server";
import * as Types from "../../types.js";
import utilities from "../../utilities/index.js";
import PlayerManager from "../managers/players.js";

/**
 * This is an instance of a match that is tied
 * to 
 */
export default class Match {

    id: string
    server: GeckosServer | undefined
    room: any
    players: PlayerManager

    constructor (id: string, server: GeckosServer | undefined) {
        this.id = id;
        this.server = server;

        this.room = this.server?.room(this.id);
        this.players = new PlayerManager(this);
        this.created();
    }

    /**
     * Created event, called when this class is instantiated
     */
    created () : void {
        utilities.logger.success(`Match ${this.id} was successfully created.`);
    }

    /**
     * Do all cleanup logic here
     */
    cleanup () : void {
        utilities.logger.info(`Cleanup method called for match: ${this.id}`);
    }

    /**
     * Returns information about the match
     * @returns { Types.MATCH_DATA }
     */
    data () : Types.MATCH_DATA {
        return {
            id: this.id
        }
    }
}