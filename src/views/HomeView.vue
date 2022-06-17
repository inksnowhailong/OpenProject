<template>
  <div class="home">
    <ul>
      <li v-for="(item, index) in projectData" :key="index">
        {{ item }}
      </li>
    </ul>
    <div
      class="drag-box"
      @drop.prevent.stop="handleDrop($event)"
      @dragover.prevent.stop
    >
      <h1>拖入你的文件</h1>
      <button @click="openExe">运行文件</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapMutations, mapState } from "vuex";
export default defineComponent({
  name: "HomeView",
  computed: {
    ...mapState({
      projectData: "projectData",
    }),
  },
  methods: {
    // 收集拖入的文件信息
    handleDrop(e: DragEvent) {
      if (e.dataTransfer) {
        for (const file of e?.dataTransfer.files) {
          console.log(file);

          const name = file.name;
          const path = file.path;
          this.addProject({ info: { name, path } });
        }
      }
    },
    async openExe() {
      // console.log(fs, 1);
      const data = await window.$elec.openProject(this.projectData[0].path);
      console.log(data);
    },
    ...mapMutations({
      addProject: "addProject",
    }),
  },
});
</script>
<style>
.home .drag-box {
  width: 400px;
  height: 400px;
  border: 1px dashed #999;
  margin: 0 auto;
}
</style>
