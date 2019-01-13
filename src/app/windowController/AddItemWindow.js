const electron = require('electron');
const {BrowserWindow} = electron;
const url = require('url');
const {view} = require('../functions/helpers');
const addItemWindow = {};
let addWindow;

/**
 * Create add new item window
 */
addItemWindow.createAddWindow = () => {
    addWindow = new BrowserWindow({
        width: 500,
        height: 300,
        title: 'Add shopping window'
    });

    /**
     * load the html file into the window
     */
    addWindow.loadURL(url.format({
        pathname: view('addWindow'),
        protocol: 'file',
        slashes: true
    }))
    ;

    /**
     * Garbage Collection
     */
    addWindow.on('close', () => {
        addWindow = null;
    });

    /**
     * pass window for further operations outside
     * @type {Electron.BrowserWindow}
     */
    addItemWindow.window = addWindow;
};

module.exports = addItemWindow;
