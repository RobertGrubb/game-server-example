import _ from "lodash";
import * as Types from "../../types.js";
import utilities from "../../utilities/index.js";

/**
 * Snapshot class will store the latest player
 * data and will check if it has been updated.
 * 
 * It will be used to compare data before sending
 * updates to the client (If it hasn't changed, there's no
 * need to send it over)
 */
export default class Snapshot {

    match: Types.MATCH;

    stored: Types.SNAPSHOT_STORED_DATA = {
        players: {}
    };

    changed: Types.SNAPSHOT_CHANGED_DATA = {
        players: []
    };

    constructor (match: Types.MATCH) {
        this.match = match;
        utilities.logger.info(`Snapshot instance created for ${match.id}`);
    }

    /**
     * Checks to see if a type of change has been made that is
     * associated with the id passed.
     * @param {string} type 
     * @param {string} id 
     * @returns {boolean}
     */
    hasChanged (type: string, id: string) : boolean {
        if (this.changed[type].includes(id)) {
            return true;
        }

        // They were not found in change list
        return false;
    }

    /**
     * Update will attempt to check if existing
     * data is the same as what is provided.
     * 
     * If it is, it will return false (Did not update because of being equal)
     * If it is not, it will return true (did update)
     * 
     * @param {string} type 
     * @param {string} id 
     * @param {object} data 
     * @returns boolean
     */
    update (type: string, id: string, data: Types.PLAYER_DATA) : boolean {
        const exists = this.fetch(type, id);

        if (exists) {
            if (_.isEqual(exists, data)) return false;
        }

        this.stored[type][id] = data;
        if (!this.changed[type].includes(id)) this.changed[type].push(id);
        return true;
    }

    /**
     * Will attempt to find the snapshot in the stored
     * data.
     * 
     * @param {string} type 
     * @param {string} id 
     * @returns { boolean | PLAYER_DATA }
     */
    fetch (type: string, id: string) : boolean | Types.PLAYER_DATA {
        if (!this.stored[type]) return false;
        if (!this.stored[type][id]) return false;
        return this.stored[type][id];
    }

    /**
     * Clears store data, or change data
     * 
     * @param {string} storeType 
     * @param {string} type 
     * @param {string} id 
     * @returns void
     */
    clear (storeType: string, type: string, id = null) {
        if (storeType == 'stored') {

            // Validate that information is present
            if (this.stored[type] && id) {
                if (this.stored[type][id]) this.stored[type] = {};
            }
        } else if (storeType == 'changed') {
            if (this.changed[type]) this.changed[type] = [];
        }
    }
}