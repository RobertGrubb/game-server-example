export default {
    API: {
        MESSAGES: {
            INVALID_REQUEST: "Invalid Request",
            UNABLE_TO_REMOVE: "Unable to remove",

            USER_NO_EXIST: "User does not exist"
        }
    },

    GAME_SERVER_EVENTS: {
        READY: "ready",
        INITIAL_STATE: "initialState",
        DISCONNECT: "disconnect"
    },

    GAME_LOOP_EVENTS: {
        UPDATE: "update"
    },

    MATCH_STATES: {
        DEFAULT: "pregame",
        PREGAME: "pregame",
        COUNTDOWN: "countdown",
        IN_PROGRESS: "inprogress",
        ENDGAME: "endgame",
        CANCELED: "canceled"
    },

    MATCH_EVENTS: {
        ON_END: "onEnd"
    }
}