import colors from "colors";

/**
 * Logger class
 * 
 * You can use this class to output visually appealing
 * log messages from your server.
 */
class Logger {

    /**
     * Will only output messages if this is true.
     * @param {boolean} debug
     */
    debug: boolean

    /**
     * A string that is prepended to the beginning of the log
     * @param {string} prefix
     */
    prefix: string | undefined

    constructor() {
        this.prefix = process.env.SERVER_NAME;
        this.debug = process.env.SERVER_DEBUG_LOGS == "true";
    }

    info (msg: string) {

        if (this.debug) {
            console.log(colors.cyan(`${this.prefix || ""}[info]: ${msg}`));
        }
    }

    success (msg: string) {

        if (this.debug) {
            console.log(colors.green(`${this.prefix || ""}[success]: ${msg}`));
        }
    }

    warning (msg: string) {

        if (this.debug) {
            console.log(colors.yellow(`${this.prefix || ""}[warning]: ${msg}`));
        }
    }

    error (msg: string) {

        if (this.debug) {
            console.log(colors.red(`${this.prefix || ""}[error]: ${msg}`));
        }
    }
}

export default new Logger;