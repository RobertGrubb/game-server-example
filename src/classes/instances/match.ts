import { GeckosServer, ServerChannel } from "@geckos.io/server";
import * as Types from "../../types.js";
import ENUMS from "../../enums.js";
import utilities from "../../utilities/index.js";
import PlayerManager from "../managers/players.js";
import GameLoop from "./game-loop.js";
import Snapshot from "./snapshot.js";

/**
 * This is an instance of a match that is tied
 * to 
 */
export default class Match {

    id: string;
    server: GeckosServer | undefined;
    room: any;
    players: PlayerManager;
    gameLoop: GameLoop;
    matchState: Types.MATCH_STATE = ENUMS.MATCH_STATES.DEFAULT;
    snapshot: Types.SNAPSHOT;

    /**
     * Events that are being listened to
     */
    events: Array<{ key: string, func: CallableFunction }> = [];

    /**
     * Setup all resources for the match to run
     * @param {string} id Identifier of the match
     * @param { GeckosServer } server Geckios IO server instance 
     */
    constructor (id: string, server: GeckosServer | undefined) {
        this.id = id;
        this.server = server;

        this.room = this.server?.room(this.id);
        this.players = new PlayerManager(this);
        this.gameLoop = new GameLoop(this);
        this.snapshot = new Snapshot(this);

        this.created();
    }

    /**
     * Created event, called when this class is instantiated
     */
    created () : void {
        utilities.logger.success(`Match ${this.id} was successfully created.`);

        /**
         * Process the updates for this current game loop
         */
        this.gameLoop.on(ENUMS.GAME_LOOP_EVENTS.UPDATE, (delta: number) => {
            this.update(delta);

            /**
             * @TODO Get changes from snapshot and send them to
             * the room.
             */

            // Clear changed
            this.snapshot.clear("changed", "players");
        })
    }

    /**
     * The main update loop for matches.
     * 
     * All instances that are game related should be updated here.
     * 
     * @param {number} delta 
     */
    update (delta: number) : void {
        
    }

    /**
     * Do all cleanup logic here
     */
    cleanup () : void {
        utilities.logger.info(`Cleanup method called for match: ${this.id}`);
    }

    /**
     * Returns information about the match
     * @returns { Types.MATCH_DATA }
     */
    data () : Types.MATCH_DATA {
        return {
            id: this.id
        }
    }

    /**
     * ---------------------------------
     * Utility methods
     * ---------------------------------
     */

    /**
     * Sets the correct state and starts the game loop
     */
    start () {
        utilities.logger.info(`Match ${this.id} has started.`);
        this.setState(ENUMS.MATCH_STATES.IN_PROGRESS);

        /**
         * Testing for end game
         */
        setTimeout(() => {
            this.stop();
        }, 5000);
    }

    /**
     * Sets the correct state and stops the game loop
     */
    stop () {
        utilities.logger.info(`Match ${this.id} has stopped.`);
        this.setState(ENUMS.MATCH_STATES.ENDGAME);
    }

    /**
     * This will update the state of the match and depending on
     * the state provided, run some logic that pertains to that
     * state provided.
     * @param {string} state The state for the match to be set to 
     */
    setState (state: Types.MATCH_STATE) {
        this.matchState = state;

        // Depending on the state, do some work
        switch (this.matchState) {

            // Start the game loop
            case ENUMS.MATCH_STATES.IN_PROGRESS:
                this.gameLoop.start();
                break;

            // End the game loop and call the event
            case ENUMS.MATCH_STATES.ENDGAME:
                this.gameLoop.stop((time: number) => {
                    this.emit(ENUMS.MATCH_EVENTS.ON_END, {
                        timestamp: time
                    });
                });
                break;
        }
    }

    /**
     * Registers a listener for an event from the match
     */
    on (event: Types.MATCH_EVENT, func: CallableFunction) {
        this.events.push({
            key: event,
            func: func
        });
    }

    /**
     * Iterates the events map and calls the function associated
     * with it if the key matches.
     * @param {MATCH_EVENT} event The event to emit to 
     */
    emit (event: Types.MATCH_EVENT, data: any) {
        for (let i = 0; i < this.events.length; i++) {
            if (this.events[i].key == event) {
                this.events[i].func(data);
            }
        }
    }
}