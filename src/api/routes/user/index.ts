import express, { Request, Response, Router } from 'express';
import ENUMS from "../../../enums.js";
import * as Types from '../../../types.js';

/**
 * Creates a new match in the match pool
 * @param matches 
 * @returns { Router }
 */
const createRoute = (database: Types.DATABASE) : Router => {
    const router = express.Router();

    router.get('/user/:username', async (req: Request, res: Response) => {
        const username = req.params.username;

        if (!username) {
            res.status(400).json({ 
                error: true, 
                message: ENUMS.API.MESSAGES.USER_NO_EXIST
            });

            return;
        }

        const userData = await database.userExists(username);

        res.json({
            success: true,
            user: userData
        });
    });

    return router;
}

export default createRoute;