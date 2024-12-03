import { GeckosServer } from "@geckos.io/server";
import Database from './classes/instances/database.js';
import MatchesManager from "./classes/managers/matches.js";
import PlayerManager from "./classes/managers/players.js";
import Player from "./classes/prefabs/player.js";
import Match from "./classes/instances/match.js";
import GameLoop from "./classes/instances/game-loop.js";
import Snapshot from "./classes/instances/snapshot.js";

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

export interface SNAPSHOT_PLAYERS { 
    [key: string]: PLAYER_DATA
}

export interface SNAPSHOT_STORED_DATA {
    [players: string]: SNAPSHOT_PLAYERS;
}

export interface SNAPSHOT_CHANGED_DATA {
    [players: string]: Array<string>;
}

export type MATCH_STATE = string;
export type MATCH_EVENT = string;

export type MATCH = Match;
export type PLAYER = Player;
export type DATABASE = Database;
export type MATCHES_MANAGER = MatchesManager;
export type PLAYER_MANAGER = PlayerManager;
export type GAME_LOOP = GameLoop;
export type SNAPSHOT = Snapshot;