import {openProjectParams,openAppParams} from './app-on-type'

// 指定命令打开目录      
export function openProject(exec: any) {
    return (event:any,data:openProjectParams) => {
      exec(`start cmd /c   "cd /d ${data.path} && ${data.code}" `, (error: object) => {
          // 
            if (error) {
              return error;
            }
            return false;
          });
    }
}

//   打开指定应用程序
export function openApp(exec:any) {
  return (event:any, data: openAppParams,) => {
        exec(` start ${data.path}`, (error:object) => {
            if (error) {
              return error;
            }
            return false;
          });
    }
  }