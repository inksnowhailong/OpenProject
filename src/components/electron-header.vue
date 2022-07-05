<template>
  <n-grid class="grid" :cols="24">
    <n-gi span="4">
      <div class="gi drag left-first">
        <n-gradient-text type="info"> Ink Snow </n-gradient-text>
      </div>
    </n-gi>
    <n-gi span="16">
      <div class="gi drag" />
    </n-gi>
    <n-gi>
      <div class="gi drag" />
    </n-gi>
    <n-gi span="3">
      <div class="gi operate">
        <n-button
          strong
          secondary
          circle
          type="success"
          size="tiny"
          class="close-btn"
          @click="maxwin"
        >
          <template #icon>
            <n-icon><ExpandOutline /></n-icon>
          </template>
        </n-button>
        <n-button
          strong
          secondary
          circle
          type="warning"
          size="tiny"
          class="close-btn"
          @click="minwin"
        >
          <template #icon>
            <n-icon><Remove /></n-icon>
          </template>
        </n-button>
        <n-button
          strong
          secondary
          circle
          type="error"
          size="tiny"
          class="close-btn"
          @click="closewin"
        >
          <template #icon>
            <n-icon><Close /></n-icon>
          </template>
        </n-button>
      </div>
    </n-gi>
  </n-grid>
</template>

<script setup lang="ts">
import { Close, Remove, ExpandOutline } from "@vicons/ionicons5";
// 关闭
async function closewin() {
  await window.$elec.closewin();
}
// 最小化
async function minwin() {
  await window.$elec.minwin();
}
// 最大化
async function maxwin() {
  await window.$elec.maxwin();
}
</script>

<style scoped>
.drag {
  -webkit-app-region: drag;
}
.grid {
  min-width: 580px;
}
.gi {
  display: flex;
  align-items: center;
  height: 30px;
}
.left-first {
  padding-left: 20px;
}
.operate {
  min-width: 85px;
  justify-content: space-around;
}
.close-btn {
  margin: 0 5px;
  cursor: pointer;
}
</style>
