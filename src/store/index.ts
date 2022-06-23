import { createStore, ActionContext } from "vuex";
import { db, AppType, ProgectType,AppOrProject } from "./indexDB";

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
    addProject(state: stateType, payload: ProgectType) {
      state.projectData.push(payload);
    },
    addApp(state: stateType, payload: AppType) {
      state.appData.push(payload);
    },
    init(state: stateType, payload: stateType) {
      state.projectData = payload.projectData;
      state.appData = payload.appData;
    },
  },
  actions: {
    addAction(
      { commit }: ActionContext<stateType, stateType>,
      payload: AppOrProject
    ) {
      if (payload.isApp) {
        payload ={ ...payload }
        db.apps
          .add(payload)
          .then(() => {
            commit("addApp", payload);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        db.projects
          .add({ ...(payload as ProgectType) })
          .then(() => {
            commit("addProject", payload);
          })
          .catch((err) => {
            return err;
          });
      }
    },
  },
  modules: {},
});

// 初始化
init();
async function init() {
  const appData = await db.apps.toArray();
  const projectData = await db.projects.toArray();
  store.commit("init", { appData, projectData });
}

export default store;
