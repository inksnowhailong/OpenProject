import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("$elec", {
  // triggerDevtool: () => ipcRenderer.send("trigger-devtool"),
  openProject: (data: any) => ipcRenderer.invoke("openProject", data),
});

// window.addEventListener("DOMContentLoaded", () => {
//   window.addEventListener("keyup", (event) => {
//     if (event.key === "F12") {
//       window.$elec.triggerDevtool();
//     }
//   });
// });
