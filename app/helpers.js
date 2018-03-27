const electron = require('electron');
const BrowserWindow = electron.remote.BrowserWindow;

let mainWindow;
let methods = {};

// Page opening function
methods.openWindow = (page) => {
  const opts = {
    show: false
  }
  const pos = electron.remote.getCurrentWindow().getPosition();
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    x: pos[0],
    y: pos[1],
    icon: "__dirname + '/images/mac/icon.icns",
  });
  // Open the DevTools.
  mainWindow.webContents.openDevTools()
  mainWindow.loadURL(`file://${__dirname}/` + page + `.html`);
  // mainWindow.loadURL(`file://${__dirname}/` + page + `.html`);
  electron.remote.getCurrentWindow().close();
}

module.exports = methods;
