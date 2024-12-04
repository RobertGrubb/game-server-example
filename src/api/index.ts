import express from 'express';
import routes from "./routes/index.js";
import cors from 'cors';
import bodyParser from "body-parser";
import * as Types from "@/types.js";
import utilities from "@/common/utilities.js";

const api = (gameServer: Types.GAME_SERVER, database: Types.DATABASE) => {
    /**
     * API Configuration
     */
    const app = express();

    /**
     * CORS setup
     */
    const options: cors.CorsOptions = { origin: [ '*' ] };
    app.use(cors(options));

    /**
     * Use body parser
     */
    app.use(bodyParser.json());

    /**
     * Use imported routes
     */
    app.use('/', routes(gameServer.managers.matches, database));

    /**
     * API Listener
     */
    const API_PORT = process.env.SERVER_API_PORT || 3010;
    app.listen(API_PORT, () => {
        utilities.logger.success(`Server is running on port ${API_PORT}`);
    });
}

export default api;