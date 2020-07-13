"use strict";

const electron = require('electron');
const app = electron.app || require('app');
const BrowserWindow = electron.BrowserWindow || require('browser-window');
const Menu = electron.Menu;
var mainWindow = null;

function CreateWindow() {
    Menu.setApplicationMenu(null);
    mainWindow = new BrowserWindow({
        maximizable: false,      // フルスクリーン禁止(lINUX以外)
        minWidth: 400,
        minHeight: 300,
 //       maxWidth: 800,
 //       maxHeight: 600,
        webPreferences: {
            nodeIntegration: true // Nodeモジュール使用
        }
    });
    mainWindow.loadFile("index.html");
    mainWindow.webContents.openDevTools();

    mainWindow.on("closed", () => {
        mainWindow = null;
    });
}

app.on("ready", CreateWindow);

app.on("window-all-closed", () => {
    if (process.platform != "darwin") {
        app.quit();
    }
});