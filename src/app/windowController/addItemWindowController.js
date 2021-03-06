const electron = require('electron');
const {BrowserWindow} = electron;
const url = require('url');
const {view} = require('../functions/helpers');
const addItemWindowController = {};
let addWindow;

/**
 * Create add new item window
 */
addItemWindowController.createAddWindow = () => {
    addWindow = new BrowserWindow({
        width: 350,
        height: 200,
        title: 'Add shopping window',
    });
    addWindow.setResizable(false);
    addWindow.setMinimizable(false);

    /**
     * load the html file into the window
     */
    addWindow.loadURL(url.format({
        pathname: view('addWindow'),
        protocol: 'file',
        slashes: true
    }));

    /**
     * set menu to null
     */
    addWindow.setMenu(null);

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
    addItemWindowController.window = addWindow;
};

module.exports = addItemWindowController;
