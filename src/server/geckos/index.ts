import geckos, { GeckosServer, ServerChannel } from "@geckos.io/server";
import { IncomingMessage, OutgoingMessage } from "http";
import * as Types from "@/types.js";
import utilities from "@/common/utilities.js";
import MatchesManager from '../classes/managers/matches.js';

/**
 * This will setup the geckos server and run it.
 */
const server = (database: Types.DATABASE) : Types.GAME_SERVER => {
    utilities.logger.info('Starting Geckos...');

    // Instantiate the matches manager
    const Matches : MatchesManager = new MatchesManager();

    // Setup the geckos server
    const io: GeckosServer = geckos({

        /**
         * A async function to authenticate and authorize a user.
         * @param auth The authentication token
         * @param request The incoming http request
         * @param response The outgoing http response
         */
        authorization: async (
            auth: string | undefined,
            request: IncomingMessage,
            response: OutgoingMessage
        ) => {

            if (!auth) return false;

            /**
             * Auth token is split via a period in the following syntax:
             * 
             * username.matchId
             */
            const token = auth.split(".");
            const username = token[0];
            const matchId = token[1];

            /**
             * Check if the match exists
             */
            if (!Matches.exists(matchId)) {
                return false;
            }

            /**
             * Return user data
             */
            return {
                username: username,
                matchId: matchId
            }
        },

        cors: { 
            allowAuthorization: process.env.GAME_SERVER_ALLOW_AUTHORIZATION === "true", 
            origin: process.env.GAME_SERVER_ALLOW_ORIGIN || '*' 
        }
    });

    /**
     * Set the server instance in the MatchManager
     */
    Matches.setServer(io);

    /**
     * On game server connection
     */
    io.onConnection((socket: ServerChannel) => {

        /**
         * Validate match exists
         */
        const match = Matches.get(socket.userData.matchId);
        if (!match) {
            utilities.logger.error(`Player tried to join ${socket.userData.matchId}, but it does not exist. Closing...`);
            socket.close();
            return;
        }

        // Create the player
        match.instance.players.create(socket);
    });

    /**
     * Set the server to listen for connections
     */
    const GAME_SERVER_PORT: number = Number(process.env.GAME_SERVER_PORT || 3011);
    io.listen(GAME_SERVER_PORT)
    utilities.logger.success(`Geckos is waiting for connections on port ${GAME_SERVER_PORT}...`);

    /**
     * Return available information
     */
    return {
        server: io,
        managers: {
            matches: Matches
        }
    }
};

export default server;