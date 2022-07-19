import { app, protocol, BrowserWindow, ipcMain } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS3_DEVTOOLS } from "electron-devtools-installer";
import path from "path";
import { exec } from "child_process";
import ons from './ele-module/app-on'
import update from 'update-electron-app'
update({
  repo: 'inksnowhailong/openProject'
})

const isDevelopment = process.env.NODE_ENV !== "production";
let win: any = null
app.disableHardwareAcceleration()//程序 ready 前禁用GPU加速  解决打包后的程序打开黑屏
// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } },
]);
async function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 850,
    height: 500,
    show: false,
    titleBarStyle: "hiddenInset",
    frame: false,//去掉原有的标题栏
    minimizable: true, // 可否最小化
    maximizable: true, // 可否最大化
    closable: true, // 展示关闭按钮
    fullscreen: false, // MAC下是否可以全屏
    skipTaskbar: false, // 在任务栏中显示窗口
    acceptFirstMouse: true, // 是否允许单击页面来激活窗口
    transparent: false,
    movable: true, // 可否移动
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: process.env
        .ELECTRON_NODE_INTEGRATION as unknown as boolean,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,

    },
  });
  // ipcMain.on("trigger-devtool", () => {
  //   const webContent = win.webContents;
  //   webContent.isDevToolsOpened()
  //     ? webContent.closeDevTools()
  //     : webContent.openDevTools();
  // });
  win.once("ready-to-show", () => {
    win.show();
  });
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    win.loadURL("app://./index.html");
  }
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS);
    } catch (e: any) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }
  
 
  // ipcMain.handle("openProject", openProject(exec) as any);
  // ipcMain.handle("openApp", openApp(exec) as any);
  createWindow();
   // ipc通讯 执行指定方法  传入方法执行所需的参数 
   Object.keys(ons).forEach((item: string) => {
    // type onsType = keyof typeof ons 
    const targetfunc = ons[item as keyof typeof ons] 
    
    ipcMain.handle(item, targetfunc({exec,win}) as any);
  })
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", (data) => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}


