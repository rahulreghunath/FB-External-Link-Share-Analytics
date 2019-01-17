const electron = require('electron');
const url = require('url');
const path = require('path');
const grabity = require('grabity');
const {app, BrowserWindow, Menu, ipcMain} = electron;
const moment = require('moment');


/**
 * WindowController
 */

const addItemWindow = require('./app/windowController/addItemWindowController');

/**
 *Functions
 */

const itemOperations = require('./app/functions/itemOperations');

/**
 * Database Operations
 */
const itemDbOperations = require('./database/itemDbOperations');

/**
 * helpers
 */
const {apple} = require('./constants/helperConstants');

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
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

    // mainWindow.setMenu(mainMenu)

    /**
     * inserting the menu
     */
    Menu.setApplicationMenu(mainMenu);

    mainWindow.webContents.once('dom-ready', () => {
        itemDbOperations.getAllData().then(data => {
            mainWindow.webContents.send('item:old', data);
        });
    });
    mainWindow.on('reloaded', () => {
        // itemDbOperations.getAllData().then(data => {
        //     mainWindow.webContents.send('item:old', data);
        // });
        console.log('reloaded');
    });
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
                        dataValues: {
                            url: item,
                            title: response.data.og_object.title,
                            reactions: response.data.engagement.reaction_count,
                            comments: response.data.engagement.comment_count,
                            shares: response.data.engagement.share_count,
                            imageUrl: image,
                            status: 1,
                        }
                    };
                    itemDbOperations.saveData(data.dataValues);
                    data.dataValues.updatdAt = moment();
                    mainWindow.webContents.send('item:add', data);

                });

            }

        }).catch(error => {
        console.log(error);
    });
    addItemWindow.window.close();
});


const mainMenuTemplate = [
    {
        label: 'file',
        submenu: [
            {
                label: 'Add Url',
                click() {
                    addItemWindow.createAddWindow();
                }
            },
            {
                label: 'Refresh',
                click() {
                    itemOperations.refreshItems().then(response => {
                        setTimeout(() => {
                            itemDbOperations.getAllData().then(data => {
                                mainWindow.webContents.send('item:old', data);
                            });
                        }, 5000);
                    });
                }
            },
            {
                label: 'Quit',
                accelerator: apple ? 'Command+Q' : 'Ctrl+Q',
                click() {
                    app.quit();
                }
            }
        ]
    }
];

if (process.env.NODE_ENV !== 'production') {
    mainMenuTemplate.push(
        {
            label: 'Dev Tools',
            submenu: [
                {
                    label: 'Toggle DevTools',
                    accelerator: apple ? 'Command+i' : 'Ctrl+i',
                    click(item, focusedWindow) {
                        focusedWindow.toggleDevTools();
                    }
                },
                {
                    role: 'reload'
                }
            ]
        }
    );
}
