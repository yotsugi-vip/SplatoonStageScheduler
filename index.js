"use strict";

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
var mainWindow = null;

function CreateWindow () {
  mainWindow = new BrowserWindow({
    maxWidth: 800,
    maxHeight: 600,
    webPreferences:{
      nodeIntegration: true
    }
  });
  
  mainWindow.setMenu(null);
  mainWindow.loadFile("index.html");
  mainWindow.webContents.openDevTools();
  mainWindow.on('closed', ()=>{
    mainWindow = null;
  });
}

app.on('ready', CreateWindow);

app.on('window-all-closed', ()=>{
  if (process.platform != 'darwin') {
    app.quit();
  }
});