<template>
  <n-layout class="main-layout">
    <n-layout-header>
      <main-headers></main-headers>
    </n-layout-header>
    <n-layout has-sider class="content-layout">
      <n-layout-sider>
        <single-open></single-open>
      </n-layout-sider>
      <n-layout-content content-style="padding: 24px;">
        平山道
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from "vue";
import { mapMutations, mapState } from "vuex";
import MainHeaders from "../components/main-headers.vue";
export default defineComponent({
  name: "HomeView",
  computed: {
    ...mapState({
      projectData: "projectData",
    }),
  },
  components: {
    singleOpen: defineAsyncComponent(
      () => import("../components/single-open.vue")
    ),
    mainHeaders: defineAsyncComponent(
      () => import("../components/main-headers.vue")
    ),
    MainHeaders,
  },
  mounted() {
    console.log(this);
  },
  methods: {
    async openExe() {
      const data = await window.$elec.openProject(this.projectData[0].path);
      console.log(data);
    },
    ...mapMutations({
      addProject: "addProject",
    }),
  },
});
</script>
<style scoped>
.home .drag-box {
  width: 400px;
  height: 400px;
  border: 1px dashed #999;
  margin: 0 auto;
}

.n-layout-header {
  height: 80px;
  padding: 10px;
  box-sizing: border-box;
}

.main-layout,
.n-layout-sider {
  height: 100%;
}
.content-layout {
  height: calc(100% - 80px);
}
</style>
