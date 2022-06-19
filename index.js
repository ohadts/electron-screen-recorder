const electron = require('electron');
const {app, BrowserWindow, ipcMain, desktopCapturer, dialog} = electron;


app.whenReady().then(()=>{
    const mainWindow = new BrowserWindow({
        with: 800,
        height: 600,
        webPreferences:{
            preload: `${__dirname}/preload.js`
        }
    });
    mainWindow.loadURL(`file://${__dirname}/mainWindow.html`);
    if (!app.isPackaged) { mainWindow.webContents.openDevTools(); }

})

ipcMain.handle(
    'DESKTOP_CAPTURER_GET_SOURCES',
    (event) => desktopCapturer.getSources({
        types: ['window', 'screen']
      })
  )

  ipcMain.handle(
    'DESKTOP_CAPTURER_SAVE_DIALOG', (event) => dialog.showSaveDialog({
      buttonLabel: 'Save video',
      defaultPath: `vid-${Date.now()}.webm`
    })
)
