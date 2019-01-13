const electron = require('electron');
const {app} = electron;
const {apple} = require('./../constants/helperConstants');
const mainWindow = require('../app/windowController/AddItemWindow');

const menu = {};
menu.mainMenuTemplate = [
    {
        label: 'file',
        submenu: [
            {
                label: 'Add Url',
                click() {
                    mainWindow.createAddWindow();
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
