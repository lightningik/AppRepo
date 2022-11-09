const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path')
const url = require('url')



function createWindow(){
    const mainWindow = new BrowserWindow({
        width:800,
        height:600,
        show: false,
        frame: false
    })

    mainWindow.loadFile('index.html')

    var splash = new BrowserWindow({
        width: 500,
        height: 300,
        transparent: true,
        frame: false,
        alwaysOnTop: true
    });

    splash.loadFile('views/splash/splash.html');
    splash.center();
    setTimeout(function () {
        splash.close();
        mainWindow.center();
        mainWindow.show();
    }, 5000);



}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        // On macOS, it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin'){
        app.quit();
    }
})

ipcMain.on('app_version', (event) => {
    event.sender.send('app_version', { version: app.getVersion() });
});