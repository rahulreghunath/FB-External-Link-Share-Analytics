const path = require('path');

const {windowDir} = require('../../constants/helperConstants');

const helpers = {};
/**
 * @description return Window html file location
 * @param {string} file
 * @returns {string}
 */
helpers.view = (file) => {
    return path.join(__dirname, `${windowDir + file}.html`)
};

module.exports = helpers;
