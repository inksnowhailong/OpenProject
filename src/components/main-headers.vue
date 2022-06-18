<template>
  <n-h3 @drop="handleDrop" @dragover.stop.prevent>
    <n-text type="primary">
      将你的
      <n-text type="info">项目文件夹</n-text>
      或者要启动的
      <n-text type="info">应用程序（如.exe）</n-text
      >拖拽至此处以添加新的启动项</n-text
    >
  </n-h3>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();

    return {
      // 收集拖入的文件信息
      handleDrop(e: DragEvent) {
        if (e.dataTransfer) {
          for (const file of e?.dataTransfer.files) {
            console.log(file);

            const name = file.name;
            const path = file.path;
            store.commit("addProject", { name, path });
          }
        }
      },
    };
  },
});
</script>

<style scoped>
.n-h3 {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  border: 2px #dcdfe6 dashed;
  border-radius: 4px;
}
</style>
