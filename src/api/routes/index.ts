import express, { Request, Response, Router } from 'express';
import * as Types from 'src/types.js';
import MatchesManager from '@/server/classes/managers/matches.js';

/**
 * Match routes
 */
import matchesCreate from "@/api/routes/matches/create.js";
import matchesRemove from "@/api/routes/matches/remove.js";

/**
 * User routes
 */
import userIndex from "@/api/routes/user/index.js";

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