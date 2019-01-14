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
    return await Url.findAll().then(results => {
        return results;
    });
};


module.exports = itemDbOperations;
