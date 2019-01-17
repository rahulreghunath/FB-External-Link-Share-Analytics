const axios = require('axios');

const http = {};

/**
 *
 * @param {string } url
 * @param {Object} params
 * @param {Object} config
 * @returns {Promise<*>}
 */
http.get = async ({url, params = {}, config = {}}) => {
    try {
        return await axios.get(url, {
            params
        });
    } catch (error) {
        console.log(error);
        return error;
    }
};

module.exports = http;
