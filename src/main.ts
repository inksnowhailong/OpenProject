import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/styles/global.css";
import * as NUI from "./plugins/nativeUI";
console.log(NUI);

createApp(App).use(store).use(router).use(NUI.default).mount("#app");
