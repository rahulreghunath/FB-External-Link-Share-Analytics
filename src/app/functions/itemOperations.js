const axios = require('axios');
const env = require('../../constants');

const itemOperations = {};

/**
 * @description fetch data from facebook graph api
 * @param {string} url
 * @returns {Promise<void>}
 */
itemOperations.fetchApiData = async (url) => {

    console.log(`${env.apiEndPoint}?id=${url}&fields=engagement,og_object&access_token=${env.accessToken}`);
    try {
        return await axios.get(env.apiEndPoint, {
            params: {
                id: url,
                fields: 'engagement,og_object',
                access_token: env.accessToken,
            }
        });
    } catch (error) {
        console.log(error);
        return error;
    }
};

module.exports = itemOperations;
