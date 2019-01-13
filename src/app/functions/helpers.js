const path = require('path');

const {windowDir} = require('../../constants/helperConstants');

const helpers = {};

/**
 * @description return Window html file location
 * @param {string} fileName
 * @returns {string}
 */
helpers.view = (fileName) => {
    return path.join(__dirname, `${windowDir + fileName}.html`)
};

module.exports = helpers;
