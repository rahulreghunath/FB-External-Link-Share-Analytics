/**
 * Helper functions
 */
const moment = require('moment');

const helpers = {};
/**
 * user asset urls
 * @type {{methods: {asset(*): string}}}
 */
helpers.asset = {
    methods: {
        /**
         * Return fully qualified url of given path
         * @param path
         * @returns {string}
         */
        asset(path) {
            if (location.hostname === 'localhost') {
                return `/static/${path}`;
            }
            return `${window.location.protocol}//${location.hostname}/${path}`;
        },
    },
};

helpers.dateTimeFormatter = {
    methods: {
        /**
         * change time format to h:m:s a
         * @param time
         */
        formatTime(time) {
            return moment(time, 'HH:mm:ss')
                .format('h:mm:ss a');
        },
        /**
         * Change dateformat to dd-mm-yyyy
         * @param date
         */
        formatDate(date) {
            return moment(date, 'YYYY-MM-DD')
                .format('DD-MM-YYYY');
        },
        dateTime(timestamp) {
            return moment(timestamp)
                .format('DD-MM-YYYY h:mm a');
        },
    },
};

module.exports = helpers;
