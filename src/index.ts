/**
 * Import and configure dotenv
 */
import "dotenv/config";

/**
 * Necessary imports
 */
import utilities from "./utilities/index.js";
import api from './api/index.js';
import geckos from './geckos/index.js';
import MatchesManager from './classes/managers/matches.js';

/**
 * Print that the server is booting up
 */
utilities.logger.info(`Booting up ${process.env.SERVER_NAME || "Game Server"}`);

/**
 * Start the game server
 */
const gameServer = geckos();

/**
 * Start the api
 */
api(gameServer);