const db = require('../database/database');
const {model} = require('../app/functions/helpers');

let itemDbOperations = {};

const Url = db.import(model('url'));

/**
 * @description save url item data to Urls table
 * @param {Object} data
 */
itemDbOperations.saveData = (data) => {
    const urlData = Url.build(data);
    urlData.save().then(function () {
        console.log('data added');
    });
};

/**
 * @description get all url data from Urls table
 * @returns {Promise<>}
 */
itemDbOperations.getAllData = async () => {
    return await Url.findAll({
        order: [
            ['id', 'DESC'],
        ],
    }).then(results => {
        return results;
    });
};

/**
 * @description update url details after re-fetching from the graph api
 * @param {number} id
 * @param {Object} data
 * @param {boolean} returnData
 * @returns {Promise<boolean>}
 */
itemDbOperations.updateData = async ({id, data, returnData = false}) => {

    const oldData = await Url.findOne({where: {id: id}});
    await oldData.update(data);
    if (returnData === true) {
        return await Url.findOne({where: {id: id}});
    }
    return true;

};

/**
 * @description Delete a specific item from table
 * @param {number} id
 * @returns {Promise<boolean>}
 */
itemDbOperations.deleteItem = async ({id}) => {
    return await Url.destroy({
        where: {
            id: id
        }
    }).then(response => {
        console.log(response);
        return true;
    });
};


module.exports = itemDbOperations;


