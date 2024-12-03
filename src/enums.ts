export default {

    /**
     * API related
     */
    API: {
        MESSAGES: {
            INVALID_REQUEST: "Invalid Request",
            UNABLE_TO_REMOVE: "Unable to remove",

            USER_NO_EXIST: "User does not exist"
        }
    },

    /**
     * Game server events 
     * Events that the game server listens for via geckos
     */
    GAME_SERVER_EVENTS: {
        READY: "ready",
        INITIAL_STATE: "initialState",
        DISCONNECT: "disconnect"
    },

    /**
     * Events that the game loop instance emits
     */
    GAME_LOOP_EVENTS: {
        UPDATE: "update"
    },

    /**
     * Defined match states to check against
     */
    MATCH_STATES: {
        DEFAULT: "pregame",
        PREGAME: "pregame",
        COUNTDOWN: "countdown",
        IN_PROGRESS: "inprogress",
        ENDGAME: "endgame",
        CANCELED: "canceled"
    },

    /**
     * Events that a match can emit during it's life time
     */
    MATCH_EVENTS: {
        ON_END: "onEnd"
    }
}