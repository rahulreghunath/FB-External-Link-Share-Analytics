const helperConstant = {};

helperConstant.apple = process.platform === 'darwin'; // os is mac or not used for keyboard shortcuts
helperConstant.windowDir = '../../windows/';
helperConstant.modelDir = '../../../models/';

module.exports = helperConstant;
