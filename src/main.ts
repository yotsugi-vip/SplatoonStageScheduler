"use strict";

import { ipcMain } from 'electron';
import { app, BrowserWindow, Menu } from 'electron';
var mainWindow = null;

// スケジュールの取得とキャッシュ作業は完全にmain側で行う方針

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
    mainWindow.loadFile("build/index.html");
    //mainWindow.webContents.openDevTools();

    mainWindow.on("closed", () => {
        mainWindow = null;
    });
}

ipcMain.on('request', (event, arg) => {
    let ret:string;
    switch (arg) {
        case 'tmpPath':
            ret = event.returnValue = app.getPath('userData');
            break;
        default:
            ret = event.returnValue = "OK";
            break;
    }
    console.log("req:", arg);
    console.log("res:", ret);
});

app.on("ready", CreateWindow);

app.on("window-all-closed", () => {
    if (process.platform != "darwin") {
        app.quit();
    }
});