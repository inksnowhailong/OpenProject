<template>
  <n-layout class="main-layout">
    <n-layout-header>
      <main-headers></main-headers>
    </n-layout-header>
    <n-layout
      has-sider
      class="content-layout"
      :native-scrollbar="false"
      :content-style="{ height: '100%' }"
    >
      <n-layout-sider :native-scrollbar="false" :content-style="{ height: '100%' }">
        <single-open></single-open>
      </n-layout-sider>
      <n-layout-content content-style="padding: 24px;"> 平山道 </n-layout-content>
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
    singleOpen: defineAsyncComponent(() => import("../components/single-open.vue")),
    mainHeaders: defineAsyncComponent(() => import("../components/main-headers.vue")),
    MainHeaders,
  },
  methods: {
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
  height: var(--main-height);
}
</style>
