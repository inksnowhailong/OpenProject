import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('$elec', {
  // triggerDevtool: () => ipcRenderer.send("trigger-devtool"),
  openProject: (code: string, path: string) =>
    ipcRenderer.invoke('openProject',{ code, path}).then(res=>res),
  openApp: (path: string) => ipcRenderer.invoke('openApp', {path}),
})

// window.addEventListener("DOMContentLoaded", () => {
//   window.addEventListener("keyup", (event) => {
//     if (event.key === "F12") {
//       window.$elec.triggerDevtool();
//     }
//   });
// });
