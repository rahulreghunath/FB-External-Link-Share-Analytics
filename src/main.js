const electron = require('electron');
const url = require('url');
const path = require('path');
const grabity = require('grabity');
const {app, BrowserWindow, Menu, ipcMain} = electron;

/**
 * Components
 */

const menuBar = require('./components/menuBar');

/**
 * WindowController
 */

const addWindow = require('./app/windowController/addItemWindowController');

/**
 *Functions
 */

const itemOperations = require('./app/functions/itemOperations');

/**
 * Database Operations
 */

const itemDbOperations = require('./database/itemDbOperations');

/**
 * Local variables
 */
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

    // mainWindow.setMenu(mainMenu)

    /**
     * inserting the menu
     */
    Menu.setApplicationMenu(mainMenu);

    // mainWindow.webContents.send('item:add', data);

});
itemDbOperations.getAllData().then(data => {

    mainWindow.webContents.send('item:old', 'data');
});
ipcMain.on('item:add', (e, item) => {

    /**
     * @description get open graph imag url of given url
     * @param {string} url
     * @returns {Promise<string>}
     */
    const getImage = async (url) => {
        try {
            const img = await grabity.grabIt(url);
            return img.image !== undefined ? img.image : 'https://en.facebookbrand.com/wp-content/uploads/2016/05/flogo_rgb_hex-brc-site-250.png'
        } catch (e) {
            return 'https://en.facebookbrand.com/wp-content/uploads/2016/05/flogo_rgb_hex-brc-site-250.png';
        }
    };

    itemOperations.fetchApiData(item)
        .then(response => {
            if (response.status === 200) {

                getImage(item).then((image) => {
                    const data = {
                        url: item,
                        title: response.data.og_object.title,
                        reactions: response.data.engagement.reaction_count,
                        comments: response.data.engagement.comment_count,
                        shares: response.data.engagement.share_count,
                        imageUrl: image,
                    };

                    mainWindow.webContents.send('item:add', data);

                    itemDbOperations.saveData(data);
                });

            }

        }).catch(error => {
        console.log(error);
    });
    addWindow.window.close();
});
