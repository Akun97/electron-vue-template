import { app, BrowserWindow, ipcMain, Notification } from 'electron'
import '../renderer/store'
import Elp from 'electron-launch-page'
import path from 'path'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080/index.html`
  : `file://${__dirname}/index.html`
const launchURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080/launch.html`
  : `file://${__dirname}/launch.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    title: 'ac_tools',
    width: 1280,
    height: 800,
    minWidth: 1280,
    minHeight: 800,
    resizable: true,//允许调整窗口大小
    useContentSize: true,
    webPreferences: {
      nodeIntegration: true,//是否集成node
      enableRemoteModule: true
    },
    transparent: false,
    show: false,
    frame: !(process.platform === 'win32'),//windows隐藏窗口菜单
    titleBarStyle: 'hidden',//macOS隐藏标题栏
  })

  ipcMain.on('closeWindow', () => {
    app.quit()
  })

  ipcMain.on('minWindow', () => {
    mainWindow.minimize()
  })

  ipcMain.on('maxWindow', (e, arg) => {
    //兼容windows,
    //windows设置-webkit-app-region: drag;后双击区域会自动缩放
    //但是窗口new BrowserWindow要是设置了transparent:true,isMaximized()无论怎么样都会返回false
    //自定义参数来判断，选择做全屏效果，若是做缩放效果，会跟-webkit-app-region: drag带来的双击窗口缩放冲突
    //-webkit-app-region: drag双击窗口缩放只在windows上出现
    if (process.platform === 'win32') {
      arg.isFull ? mainWindow.setFullScreen(false) : mainWindow.setFullScreen(true)
    } else {
      mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize()
    }
  })

  ipcMain.on('notification', (e, message) => {
    let notification = new Notification({
      icon: path.join(__static, 'logo.png'),
      body: message, 
      silent:true 
    })
    notification.show()
    notification.on('click', () => {
      notification.close()
    })
  })

  Elp.main.start({
    mainWin: mainWindow,
    launchUrl: launchURL,
    width: 1020,
    height: 532,
    transparent: true
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  app.quit()
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
