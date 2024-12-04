import express, { Request, Response, Router } from 'express';
import MatchesManager from '@/server/classes/managers/matches.js';

/**
 * Creates a new match in the match pool
 * @param matches 
 * @returns { Router }
 */
const createRoute = (matches: MatchesManager) : Router => {
    const router = express.Router();

    router.get('/matches/create', (req: Request, res: Response) => {
        const match = matches.create();
        match.start();

        res.json({
            success: true,
            match: match?.id
        });
    });

    return router;
}

export default createRoute;