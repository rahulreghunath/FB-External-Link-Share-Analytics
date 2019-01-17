const env = require('../../constants');
const http = require('../../http');
const {getAllData} = require('../../database/itemDbOperations');
const {updateData} = require('../../database/itemDbOperations');
const itemOperations = {};

/**
 * @description fetch data from facebook graph api
 * @param {string} url
 * @returns {Promise<void>}
 */
itemOperations.fetchApiData = async (url) => {
    try {
        return await http.get({
            url: env.apiEndPoint,
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

itemOperations.refreshItems = async () => {

    const allData = await getAllData();
    let i = 0;
    for (let {dataValues} of allData) {
        // console.log({request: dataValues.id});
        getAsyncLoopData({url: dataValues.url, id: dataValues.id}).then(response => {
            if (response !== null) {
                console.log({fetch: dataValues.id});
                const data = {
                    reactions: response.engagement.reaction_count,
                    comments: response.engagement.comment_count,
                    shares: response.engagement.share_count,
                };
                updateData({id: dataValues.id, data}).then(response => {
                    i++;
                    if (allData.length === i + 1) {
                        return true;
                    }
                }).catch(error => {
                    console.log(error);
                });
            }
        });
    }

};

const getAsyncLoopData = async (data) => {
    return await itemOperations.fetchApiData(data.url).then(response => {
        if (response.status === 200) {
            return response.data;
        }
        return null;
    })
};

module.exports = itemOperations;
