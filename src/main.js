const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu, ipcMain} = electron;
const menuBar = require('./components/menuBar');

let mainWindow;

/**
 * Load Main Window
 */
app.on('ready', () => {
    mainWindow = new BrowserWindow();

    /**
     * load the html file into the window
     */
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'windows/mainWindow.html'),
        protocol: 'file',
        slashes: true
    }));

    /**
     * quit when main window is closed
     */
    mainWindow.on('closed', () => {
        app.quit();
    });
    const mainMenu = Menu.buildFromTemplate(menuBar.mainMenuTemplate);

    /**
     * inserting the menu
     */
    Menu.setApplicationMenu(mainMenu);
});
