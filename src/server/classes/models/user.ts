import { RowDataPacket } from "mysql2/promise";

export default class User {

    /**
     * Default data structure
     */
    data : { [key: string]: any } = {
        user_group_id: '',
        username: '',
        rank: 0,
        exp: 0,
    }

    constructor (data?: false | RowDataPacket) {
        if (data) this.fromData(data);
        return this;
    }

    /**
     * Get a key value from the data that has been set
     * @param {string} key 
     * @returns { any }
     */
    get (key?: string | undefined) : any {
        if (!key) return this.data;

        if (this.data[key]) {
            return this.data[key];
        }

        return null;
    }

    /**
     * Takes an object and removes any unwanted
     * keys from it.
     * @param { object } data User data
     * @returns {User}
     */
    fromData (data: false | RowDataPacket) : void {
        if (data) {
            for (let key in data) {
                if (typeof this.data[key] != "undefined") {
                    this.data[key] = data[key];
                }
            }
        }
    }
}