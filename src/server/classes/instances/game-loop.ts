import { ServerChannel } from "@geckos.io/server";
import * as Types from "@/types.js";
import utilities from "@/common/utilities.js";
import ENUMS from "@/enums.js";

/**
 * This is an instance of a player that is tied
 * to a match
 */
export default class GameLoop {

    updateTick : number = 0;
    previousTick : number = 0;
    running : boolean = false;
    framesPerSecond : number = 0;
    match: Types.MATCH;

    /**
     * Events that are being listened to
     */
    events: Array<{ key: string, func: CallableFunction }> = [];

    /**
     * Sets up all necessary resources for game loop
     * @param {Match} match The match instance the game loop is running for
     */
    constructor (match: Types.MATCH) {
        this.match = match;

        const SERVER_FPS : number = process.env.GAME_SERVER_FPS  ? Number(process.env.GAME_SERVER_FPS) : 60;
        this.framesPerSecond = (1000 / SERVER_FPS);
    }

    /**
     * Responsible for updating all instances that needs
     * updated.
     * @returns { void }
     */
    loop () {

        // Do not run the logic if the loop is not running
        if (!this.running) return;

        // Set the date
        const now = Date.now();

        // Increment the update tick
        this.updateTick++;

        // If the date is satisfied, run the logic
        if (this.previousTick + this.framesPerSecond <= now) {
            const delta = (now - this.previousTick) / 1000;

            // Emit the update event
            this.emit(ENUMS.GAME_LOOP_EVENTS.UPDATE, delta);
        }

        // Depending on the timing, we use setTimeout or setImmediate
        if (Date.now() - this.previousTick < this.framesPerSecond - 16) {
            setTimeout(this.loop.bind(this));
        } else {
            setImmediate(this.loop.bind(this));
        }
    }

    /**
     * Starts the game loop
     */
    start () {
        utilities.logger.info('Game loop is now running');
        this.running = true;
        this.loop();
    }

    /**
     * Stops the game loop
     * @param { CallableFunction } cb (Optional) Callback function after loop stops
     */
    stop (cb?: CallableFunction) {
        utilities.logger.info('Game loop has stopped running');
        this.running = false;

        if (cb) cb(Date.now());
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