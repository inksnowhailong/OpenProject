<template>
  <!-- 左侧启动单项的项目 -->
  <n-card embedded>
    <n-h3
      prefix="bar"
      align-text
      type="info"
      v-for="(item, index) in ListData"
      :key="index"
      class="listItem"
    >
      <n-text>{{ item.name }}</n-text>
      <n-button strong secondary circle type="info" @click="openExe(item, index)">
        <template #icon>
          <n-icon><Play /></n-icon>
        </template>
      </n-button>
    </n-h3>
  </n-card>
</template>

<script lang="ts">
import { Play } from "@vicons/ionicons5";
import { defineComponent } from "vue";
import { mapState } from "vuex";
import { ProgectType, AppOrProject } from "../store/indexDB";
export default defineComponent({
  name: "single-open",
  computed: {
    ...mapState({
      projectData: "projectData",
      appData: "appData",
    }),
    ListData(): Array<AppOrProject> {
      const newArr = [...this.projectData, ...this.appData];
      return newArr;
    },
  },
  components: {
    Play,
  },
  methods: {
    async openExe(itemData: AppOrProject, index: number) {
      if (itemData.isApp) {
        const data = await window.$elec.openApp(itemData.path);
        console.log(data);
      } else {
        const data = await window.$elec.openProject(
          (itemData as ProgectType).code,
          itemData.path
        );
        console.log(data);
      }
    },
  },
});
</script>

<style scoped>
.n-card {
  height: 100%;
}
.n-h3 {
  display: flex;
  justify-content: space-between;
  text-align: left;
  cursor: pointer;
}
.n-h3:hover .n-text {
  color: var(--n-bar-color);
}
</style>
