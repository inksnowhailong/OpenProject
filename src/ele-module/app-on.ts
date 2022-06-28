import { openProjectParams, openAppParams,argstype } from './app-on-type'

export default {
  // 指定命令打开目录
  openProject({ exec }:argstype) {
    return (event: any, data: openProjectParams) => {
      exec(
        `start cmd /c   "cd /d ${data.path} && ${data.code}" `,
        (error: object) => {
          //
          if (error) {
            return error
          }
          return false
        }
      )
    }
  },
  //   打开指定应用程序
  openApp({ exec }:argstype) {
    return (event: any, data: openAppParams) => {
      exec(` start ${data.path}`, (error: object) => {
        if (error) {
          return error
        }
        return false
      })
    }
  },
  closewin({ win }: argstype) {
    return () => {
      win&&win.close()
    }
  }
}
