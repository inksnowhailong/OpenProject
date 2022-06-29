import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('$elec', {
  // triggerDevtool: () => ipcRenderer.send("trigger-devtool"),
  openProject: (code: string, path: string,name:string) =>
    ipcRenderer.invoke('openProject',{ code, path,name}),
  openApp: (path: string,name:string) => ipcRenderer.invoke('openApp', {path,name}),
  closewin: () => ipcRenderer.invoke('closewin'),
})

// window.addEventListener("DOMContentLoaded", () => {
//   window.addEventListener("keyup", (event) => {
//     if (event.key === "F12") {
//       window.$elec.triggerDevtool();
//     }
//   });
// });
