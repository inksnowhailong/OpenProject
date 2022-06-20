import { createStore } from "vuex";
import { db, AppType, ProgectType } from "./indexDB";

interface stateType {
  [key: string]: any;
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
    addProject(state: stateType, payload: AppType | ProgectType) {
      if (payload.isApp) {
        state.appData.push(payload);
        db.apps.add(payload as AppType);
      } else {
        state.projectData.push(payload);
        db.projects.add(payload as ProgectType);
      }
    },
    init(state: stateType, payload: stateType) {
      state = payload;
    },
  },
  actions: {},
  modules: {},
});
// init
// console.log(store.state);

// store.commit("init", {});
export default store;
