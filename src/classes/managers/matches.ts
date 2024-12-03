import { v4 } from 'uuid';
import { GeckosServer } from "@geckos.io/server";
import ENUMS from "../../enums.js";
import utilities from "../../utilities/index.js";
import Match from "../instances/match.js";

/**
 * This class will hold all match instances
 * that are created by the server.
 */
export default class MatchesManager {

    server: GeckosServer | undefined
    matches: Array<Match>

    constructor () {
        this.matches = [];
        utilities.logger.info('MatchesManager instantiated');
    }

    /**
     * This sets the server instance within the match manager
     * @param {GeckosServer} server The geckos server instance
     */
    setServer (server: GeckosServer) {
        this.server = server;
        utilities.logger.info('MatchesManager: server instance has been set');
    }

    /**
     * Creates a new Match instance, adds it to the pool, and returns it
     * @returns { Match }
     */
    create (): Match {
        const matchId: string = v4();
        const match: Match = new Match(matchId, this.server);
        this.matches.push(match);

        /**
         * Listen for the event of when the game ends
         * and remove the match from the server pool.
         */
        match.on(ENUMS.MATCH_EVENTS.ON_END, (timestamp: number) => {
            utilities.logger.warning(`Match ${match.id} has ended. Cleaning up...`);
            this.remove(match.id);
        });

        return match;
    }

    /**
     * Checks if a match exists by it's id
     * @param {string} id 
     * @returns {boolean}
     */
    exists (id: string) : boolean {
        if (this.get(id)) {
            return true;
        }

        return false;
    }

    /**
     * Returns the instance for a match if applicable
     * @param {string} id 
     * @returns null | { key: number, instance: Match } 
     */
    get (id: string) : null | { key: number, instance: Match } {
        const key = this.matches.findIndex((m: Match) => m.id === id);

        if (key == -1) {
            return null;
        }

        return {
            key: key,
            instance: this.matches[key]
        };
    }

    /**
     * Removes a match from the matches pool
     * @param {string} id
     * @returns {boolean}
     */
    remove (id: string | undefined) : boolean {
        if (!id) return false;

        /**
         * Validate that the match exists in the pool
         */
        const match = this.get(id);
        if (!match) {
            utilities.logger.error(`Match removal attempt on id: ${id}, but was not found...`);
            return false;
        }

        /**
         * Run cleanup on the match then remove
         */
        match.instance.cleanup();
        this.matches.splice(match.key, 1);
        utilities.logger.success(`Match ${id} was removed successfully.`);

        return true;
    }
}