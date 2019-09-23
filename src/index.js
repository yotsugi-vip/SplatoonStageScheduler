"use strict";

const electron = require("electron");
const app = electron.app;
const Menu = electron.Menu;
const BrowserWindow = electron.BrowserWindow;
var mainWindow = null;

function CreateWindow() {
  Menu.setApplicationMenu(null);
  mainWindow = new BrowserWindow({
    maximizable:false,      // フルスクリーン禁止(lINUX以外)
    minWidth: 400,          
    minHeidht: 300,         
    maxWidth: 800,
    maxHeight: 600,
    webPreferences: {
      nodeIntegration: true // Nodeモジュール使用
    }
  });

  mainWindow.loadFile("./src/index.html");
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
