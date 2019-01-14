const path = require('path');

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

module.exports = helpers;
