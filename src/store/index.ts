import { createStore } from "vuex";
// 项目的类型
type payloadType = {
  name: string;
  path: string;
  isApp: boolean;
  code?: string;
};
interface stateType {
  [key: string]: any;
}
export default createStore({
  state: {
    // 待启动项目数据
    projectData: [],

    // 待启动应用
    appData: [],
  },
  getters: {},
  mutations: {
    addProject(state: stateType, payload: payloadType) {
      if (payload.isApp) {
        state.appData.push(payload);
      } else {
        state.projectData.push(payload);
      }
    },
  },
  actions: {},
  modules: {},
});
