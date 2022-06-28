import { createStore, ActionContext } from 'vuex'
import { db, AppType, ProgectType, AppOrProject } from './indexDB'

interface stateType {
  [key: string]: any
}
const store = createStore({
  state: {
    // 待启动项目数据
    projectData: [],

    // 待启动应用
    appData: [],
  },
  getters: {},
  mutations: {
    addProject(state: stateType, payload: ProgectType) {
      state.projectData.push(payload)
    },
    addApp(state: stateType, payload: AppType) {
      state.appData.push(payload)
    },
    delProject(state, id) {
      const index = state.projectData.indexOf(
        (item: ProgectType) => item.id === id
      )
      state.projectData.splice(index, 1)
    },
    delApp(state, id) {
      const index = state.appData.indexOf(
        (item: AppType) => item.id === id
      )
      state.appData.splice(index, 1)
    },

    init(state: stateType, payload: stateType) {
      state.projectData = payload.projectData
      state.appData = payload.appData
    },
  },
  actions: {
    addAction(
      { commit }: ActionContext<stateType, stateType>,
      payload: AppOrProject
    ) {
      // 处理成对象  数据库不能保存代理对象
      payload = { ...payload }
      if (payload.isApp) {
        db.apps
          .add(payload)
          .then(() => {
            console.log(1)

            commit('addApp', payload)
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        db.projects
          .add(payload as ProgectType)
          .then(() => {
            console.log(1)
            commit('addProject', payload)
          })
          .catch((err) => {
            return err
          })
      }
    },
    delAction(
      { commit }: ActionContext<stateType, stateType>,
      payload: AppOrProject
    ) {
      payload = { ...payload }
      if (payload.isApp) {
        db.apps
          .delete(payload.id as number)
          .then(() => {
            commit('delApp', payload.id)
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        db.projects
          .delete(payload.id as number)
          .then(() => {
            commit('delProject', payload.id)
          })
          .catch((err) => {
            return err
          })
      }
    },
  },
  modules: {},
})

// 初始化
init()
async function init() {
  const appData = await db.apps.toArray()
  const projectData = await db.projects.toArray()
  store.commit('init', { appData, projectData })
}

export default store
