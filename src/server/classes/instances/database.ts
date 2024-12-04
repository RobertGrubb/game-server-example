import * as Types from "@/types.js";
import utilities from "@/common/utilities.js";
import mysql, { Connection, ConnectionOptions, RowDataPacket, FieldPacket } from "mysql2/promise";

export default class Database {

    connection: Connection | undefined
    connected: boolean = false

    /**
     * Attempt the database connection when the class
     * is instantiated.
     */
    constructor () {
        this.connect();
    }

    /**
     * Connect to the database
     * @returns { Promise<boolean> }
     */
    async connect () : Promise<boolean> {

        const credentials: ConnectionOptions = {
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USERNAME,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
        };

        try {
            this.connection = await mysql.createConnection(credentials);
            utilities.logger.success('Database connection successful');
            return true;
        } catch (error) {
            utilities.logger.error('Database connection did not succeed.');
            return false;
        }
    }

    /**
     * 
     * @param username 
     * @returns 
     */
    async userExists(username: string) {
        if (!this.connection) return false;

        try {
            const [ result ] = await this.connection.execute<RowDataPacket[]>(
                "SELECT * FROM users WHERE username = ? LIMIT 1",
                [ username ]
            );

            if (result.length === 0) return false;
            return result[0];
        } catch (error) {
            return false;
        }
    }
}