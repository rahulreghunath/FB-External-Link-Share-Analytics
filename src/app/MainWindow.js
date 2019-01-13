const electron = require('electron');
const {BrowserWindow,Menu} = electron;
const url = require('url');
const path = require('path');

const menuBar = require('../components/menuBar');

const mainWindow = {};
let addWindow;
let mainMenuEl;
mainWindow.createAddWindow = () => {
    addWindow = new BrowserWindow({
        width: 300,
        height: 160,
        title: 'Add shopping window'
    });
    //load the html file into the window
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, '../windows/addWindow.html'),
        protocol: 'file',
        slashes: true
    }));

    addWindow.on('close', () => {
        addWindow = null;
    });
};

mainWindow.createMainWindow=()=>{
    mainMenuEl = new BrowserWindow();

    /**
     * load the html file into the window
     */
    mainMenuEl.loadURL(url.format({
        pathname: path.join(__dirname, 'windows/mainWindow.html'),
        protocol: 'file',
        slashes: true
    }));

    /**
     * quit when main window is closed
     */
    mainMenuEl.on('closed', () => {
        app.quit();
    });
    const mainMenu = Menu.buildFromTemplate(menuBar.mainMenuTemplate);

    /**
     * inserting the menu
     */
    Menu.setApplicationMenu(mainMenu);
};

module.exports = mainWindow;
