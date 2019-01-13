const electron = require('electron');
const url = require('url');
const path = require('path');
const grabity = require('grabity');
const {app, BrowserWindow, Menu, ipcMain} = electron;
const menuBar = require('./components/menuBar');
const addWindow = require('./app/windowController/AddItemWindow');
const itemOperations = require('./app/functions/itemOperations');

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

ipcMain.on('item:add', (e, item) => {
    let itemContent = {};
    const getImage = async () => {
        try {
            const img = await grabity.grabIt(item);
            return img.image !== undefined ? img.image : 'https://en.facebookbrand.com/wp-content/uploads/2016/05/flogo_rgb_hex-brc-site-250.png'
        } catch (e) {
            // return 'https://en.facebookbrand.com/wp-content/uploads/2016/05/flogo_rgb_hex-brc-site-250.png';
        }
    };
    itemOperations.fetchApiData(item)
        .then(response => {
            if (response.status === 200) {

                getImage(item).then((image) => {
                    mainWindow.webContents.send('item:add', {
                        title: response.data.og_object.title,
                        reactions: response.data.engagement.reaction_count,
                        comments: response.data.engagement.comment_count,
                        shares: response.data.engagement.share_count,
                        image: image,
                    });
                });

            }

        }).catch(error => {
        console.log(error);
    });
    addWindow.window.close();
})
;

