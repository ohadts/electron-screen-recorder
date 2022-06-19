const { desktopCapturer } = require('electron')
//ipc
const {
    contextBridge,
    ipcRenderer,
} = require("electron");    
const { writeFile } = require('fs');

// ipc
contextBridge.exposeInMainWorld(
    "electron", {
        getStreamSources: ()=>ipcRenderer.invoke('DESKTOP_CAPTURER_GET_SOURCES'),
        BufferFrom: Buffer.from,
        showSaveDialog: ()=>ipcRenderer.invoke('DESKTOP_CAPTURER_SAVE_DIALOG'),
        writeFile,
    }
);