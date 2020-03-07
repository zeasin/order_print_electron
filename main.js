const { app, BrowserWindow,Menu } = require('electron')
const path = require('path')
const url = require('url')
const ipc = require('electron').ipcMain

// const ipc = ipcMain
let newwin;
let win;
function createWindow () {   
  // 创建浏览器窗口
   win = new BrowserWindow({
    // width: 800,
    // height: 600,
    webPreferences: {
      nodeIntegration: true//在页面上集成 Nodejs
    }
  })
  win.maximize()

  // 并且为你的应用加载index.html
  win.loadFile('index.html')

  // 打开开发者工具
  win.webContents.openDevTools()

}
ipc.on('createWindow',()=> {
    console.log('请求打开新窗口')
    newwin = new BrowserWindow({
        modal: true,
        parent: win, //win是主窗口
  
    })
    newwin.maximize()
    newwin.loadURL(path.join('file:',__dirname,'new.html')); //new.html是新开窗口的渲染进程
    newwin.on('closed',()=>{newwin = null})
    
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // 在macOS上，当单击dock图标并且没有其他窗口打开时，
  // 通常在应用程序中重新创建一个窗口。
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

//创建应用菜单
// app.on('ready', () => {
//   const appMenu = Menu.buildFromTemplate(menuTemplate);
//   Menu.setApplicationMenu(appMenu);
// });