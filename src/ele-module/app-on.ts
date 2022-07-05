import { openProjectParams, openAppParams, argstype } from './app-on-type'

export default {
  // 指定命令打开目录
  openProject({ exec }: argstype) {
    return (event: any, data: openProjectParams) => {
      // "
      exec(
        `start cmd title ${data.name} /c   " cd /d ${data.path} && TITLE ${data.name} &&  ${data.code}"  `,
        (error: object) => {
          //
          if (error) {
            return error
          }
          return false
        },
      )
    }
  },
  //   打开指定应用程序
  openApp({ exec }: argstype) {
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
      win && win.close()
    }
  },
  minwin({ win }: argstype) {
    return () => {
      win && win.minimize()
    }
  },
  maxwin({ win }: argstype) {
    return () => {
      // 最大化与恢复正常
      console.log(win.isMaximized());
      
      win &&( win.isMaximized() ? win.unmaximize() : win.maximize())
    }
  },
}
