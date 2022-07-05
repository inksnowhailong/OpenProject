import { contextBridge, ipcRenderer } from 'electron'
import allOns from './ele-module/app-on'
import {argstype} from './ele-module/app-on-type'
// 引入on中的所有函数  自动注入监听
const ons:argstype={}
Reflect.ownKeys(allOns).map((item:string|symbol)=>{
  if(typeof item ==='string' ){
    ons[item] = (data:any)=>ipcRenderer.invoke(item,data)
  }
})
contextBridge.exposeInMainWorld('$elec',ons)

// window.addEventListener("DOMContentLoaded", () => {
//   window.addEventListener("keyup", (event) => {
//     if (event.key === "F12") {
//       window.$elec.triggerDevtool();
//     }
//   });
// });
