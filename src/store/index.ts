import { createStore, ActionContext } from 'vuex';
import { db, AppType, ProgectType, AppOrProject, BatchType } from './indexDB';

interface stateType {
  [key: string]: any;
}
const store = createStore({
  state: {
    // 待启动项目数据
    projectData: [],

    // 待启动应用
    appData: [],

    // 批量组合数据
    batchData: []
  },
  getters: {
    // 获取全部数据
    allList(state) {
      return [...state.appData, ...state.projectData];
    }
  },
  mutations: {
    // 添加项目
    addProject(state: stateType, payload: ProgectType) {
      state.projectData.push(payload);
    },
    // 添加App
    addApp(state: stateType, payload: AppType) {
      state.appData.push(payload);
    },
    // 删除项目
    delProject(state, id) {
      const index: number = state.projectData.findIndex((item: ProgectType) => item.id === id);
      state.projectData.splice(index, 1);
    },
    // 删除App
    delApp(state, id) {
      const index = state.appData.findIndex((item: AppType) => item.id === id);
      index !== -1 && state.appData.splice(index, 1);
    },
    // 初始化
    init(state: stateType, payload: stateType) {
      // 数据填入
      state.projectData = payload.projectData;
      state.appData = payload.appData;
      state.batchData = payload.batch;
    }
  },
  actions: {
    // 添加单个
    putAction({ commit }: ActionContext<stateType, stateType>, payload: AppOrProject) {
      if (payload.isApp) {
        db.apps
          .put(payload)
          .then(() => {
            // commit('addApp', payload)
            init();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        db.projects
          .put(payload as ProgectType)
          .then(() => {
            // commit('addProject', payload)
            init();
          })
          .catch((err) => {
            return err;
          });
      }
    },
    // 删除 单个
    delAction({ commit }: ActionContext<stateType, stateType>, payload: AppOrProject) {
      payload = { ...payload };
      if (payload.isApp) {
        db.apps
          .delete(payload.id as number)
          .then(() => {
            // commit('delApp', payload.id);
            init();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        db.projects
          .delete(payload.id as number)
          .then(() => {
            // commit('delProject', payload.id);
            init();
          })
          .catch((err) => {
            return err;
          });
      }
    },

    // 添加新的组合
    addNewBatch({ commit }: ActionContext<stateType, stateType>, payload: BatchType) {
      db.batch
        .put(payload)
        .then(() => {
          init();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 删除组合
    delBatch({ commit }, id: number) {
      db.batch
        .delete(id)
        .then(() => {
          window.$message.success('删除成功');
          init();
        })
        .catch((err) => {
          return err;
        });
    }
  },
  modules: {}
});

// 初始化
init();
async function init() {
  const appData = await db.apps.toArray();
  const projectData = await db.projects.toArray();
  const batch = await db.batch.toArray();
  store.commit('init', { appData, projectData, batch });
}

export default store;
