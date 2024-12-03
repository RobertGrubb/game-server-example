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
import Database from './classes/instances/database.js';

/**
 * Print that the server is booting up
 */
utilities.logger.info(`Booting up ${process.env.SERVER_NAME || "Game Server"}`);

/**
 * Instantiate database
 */
const database : Database = new Database();

/**
 * Start the game server
 */
const gameServer = geckos(database);

/**
 * Start the api
 */
api(gameServer, database);