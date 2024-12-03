import express, { Request, Response, Router } from 'express';
import MatchesManager from '../../classes/managers/matches';
import matchesCreate from "./matches/create.js";
import matchesRemove from "./matches/remove.js";

const createRoutes = (matches: MatchesManager) : Router => {

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

    return routes;
}

export default createRoutes;