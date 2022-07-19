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
    // 添加项目
    addProject(state: stateType, payload: ProgectType) {
      state.projectData.push(payload)
    },
    // 添加App
    addApp(state: stateType, payload: AppType) {
      state.appData.push(payload)
    },
    // 删除项目
    delProject(state, id) {
      const index = state.projectData.indexOf(
        (item: ProgectType) => item.id === id,
      )
      state.projectData.splice(index, 1)
    },
    // 删除App
    delApp(state, id) {
      const index = state.appData.indexOf((item: AppType) => item.id === id)
      state.appData.splice(index, 1)
    },
    // 初始化
    init(state: stateType, payload: stateType) {
      state.projectData = payload.projectData
      state.appData = payload.appData
    },
  },
  actions: {
    // 添加动作
    putAction(
      { commit }: ActionContext<stateType, stateType>,
      payload: AppOrProject,
    ) {
      if (payload.isApp) {
        db.apps
          .put(payload)
          .then(() => {
            // commit('addApp', payload)
            init()
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        db.projects
          .put(payload as ProgectType)
          .then(() => {
            // commit('addProject', payload)
            init()
          })
          .catch((err) => {
            return err
          })
      }
    },
    // 删除
    delAction(
      { commit }: ActionContext<stateType, stateType>,
      payload: AppOrProject,
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
