import { GeckosServer } from "@geckos.io/server";
import MatchesManager from "./classes/managers/matches";

export interface MATCH_DATA {
    id: string;
}

export interface PLAYER_DATA {
    id: string;
}

export interface GAME_SERVER {
    server: GeckosServer;
    managers: {
        matches: MatchesManager
    };
}