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

itemDbOperations.updateData = async ({id, data}) => {

    const oldData = await Url.findOne({where: {id: id}});
    return await oldData.update(data).then(response => {
        // console.log({updated: id});
        return true;
    });
    //
    //             return true;
    //         });
    // return await Url.findOne({where: {id: id}}).then(oldData => {
    //     console.log({updated: id});
    //     if (oldData) {
    //         oldData.update(data).then(response => {
    //
    //             return true;
    //         });
    //     }
    // })
};

module.exports = itemDbOperations;


