const path = require('path');
const moment = require('moment');

const {windowDir, modelDir} = require('../../constants/helperConstants');

const helpers = {};

/**
 * @description return Window html file location
 * @param {string} fileName
 * @returns {string}
 */
helpers.view = (fileName) => {
    return path.join(__dirname, `${windowDir + fileName}.html`)
};

/**
 * @description return path of model
 * @param {string} modelName
 * @returns {string}
 */
helpers.model = (modelName) => {
    return path.join(__dirname, modelDir + modelName)
};

helpers.dateTimeFormatter = {};

helpers.dateTimeFormatter.formatTime = (time) => {
    return moment(time, 'HH:mm:ss')
        .format('h:mm:ss a');
};

helpers.dateTimeFormatter.formatDate = (date) => {
    return moment(date, 'YYYY-MM-DD')
        .format('DD-MM-YYYY');
};


module.exports = helpers;
