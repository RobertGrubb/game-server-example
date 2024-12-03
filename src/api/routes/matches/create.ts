import express, { Request, Response, Router } from 'express';
import MatchesManager from '../../../classes/managers/matches';

/**
 * Creates a new match in the match pool
 * @param matches 
 * @returns { Router }
 */
const createRoute = (matches: MatchesManager) : Router => {
    const router = express.Router();

    router.get('/matches/create', (req: Request, res: Response) => {
        const created = matches.create();

        res.json({
            success: true,
            match: created?.id
        });
    });

    return router;
}

export default createRoute;