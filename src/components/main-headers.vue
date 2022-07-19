<template>
  <electronHeader></electronHeader>
  <n-h3 @drop="handleDrop" @dragover.stop.prevent v-bind="$attrs">
    <n-text type="primary">
      将你的
      <n-text type="info">项目文件夹</n-text>
      或者要启动的
      <n-text type="info">应用程序（如.exe）</n-text>拖拽至此处以添加新的启动项,一次请只添加一个
    </n-text>
  </n-h3>
  <projectDialogVue ref="dialogRef"></projectDialogVue>
</template>

<script setup lang="ts">
import projectDialogVue from "./project-dialog.vue";
import electronHeader from "./electron-header.vue";
import { ref } from "vue";
const dialogRef = ref();
// 收集拖入的文件信息
function handleDrop(e: DragEvent) {
  if (e.dataTransfer) {
    const file = e.dataTransfer.files[0];
    // 弹窗
    dialogRef.value.openModel(file)
  }
}
</script>

<style scoped>
.n-h3 {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 0 auto;
  border: 2px #dcdfe6 dashed;
  border-radius: 4px;
  box-sizing: border-box;
}
</style>
