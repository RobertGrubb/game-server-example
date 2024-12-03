import express, { Request, Response, Router } from 'express';
import * as Types from '../../types.js';
import MatchesManager from '../../classes/managers/matches.js';

/**
 * Match routes
 */
import matchesCreate from "./matches/create.js";
import matchesRemove from "./matches/remove.js";

/**
 * User routes
 */
import userIndex from "./user/index.js";

const createRoutes = (matches: MatchesManager, database: Types.DATABASE) : Router => {

    const routes = express.Router();

    routes.get('/', (req: Request, res: Response) => {
        res.json({
            success: true
        });
    });

    /**
     * Use imported routes
     */
    routes.use(matchesCreate(matches));
    routes.use(matchesRemove(matches));
    routes.use(userIndex(database));

    return routes;
}

export default createRoutes;