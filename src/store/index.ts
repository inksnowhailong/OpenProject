import { createStore } from "vuex";
type payloadType = {
  key: string;
  info: object;
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
      state.projectData.push(payload.info);
    },
  },
  actions: {},
  modules: {},
});
