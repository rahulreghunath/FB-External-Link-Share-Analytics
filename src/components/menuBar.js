const electron = require('electron');
const {app} = electron;
const {apple} = require('./../constants/helperConstants');
const addItemWindow = require('../app/windowController/addItemWindowController');
const {refreshItems} = require('../app/functions/itemOperations');
const menu = {};
menu.mainMenuTemplate = [
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
                    refreshItems();
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
    menu.mainMenuTemplate.push(
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

module.exports = menu;
