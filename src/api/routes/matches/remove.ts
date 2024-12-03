import express, { Request, Response, Router } from 'express';
import MatchesManager from '../../../classes/managers/matches';

/**
 * Removes a match from the match pool if it exists.
 * @param matches 
 * @returns { Router }
 */
const createRoute = (matches: MatchesManager) : Router => {
    const router = express.Router();

    router.get('/matches/remove', (req: Request, res: Response) => {
        const id : string | undefined = String(req.query.id);

        if (!id) res.status(400).json({ error: true, message: 'INVALID_REQUEST' });

        const removed = matches.remove(id);
        if (!removed) res.status(400).json({ error: true, message: 'UNABLE_TO_REMOVE' });

        res.json({
            success: true,
            message: `Removed match id: ${id}`
        });
    });

    return router;
}

export default createRoute;