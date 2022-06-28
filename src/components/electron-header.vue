<template>
  <n-grid class="grid" x-gap="24" :cols="8">
    <n-gi>
      <div class="gi drag left-first">
        <n-gradient-text type="info"> Ink Snow </n-gradient-text>
      </div>
    </n-gi>
    <n-gi span="5">
      <div class="gi drag" />
    </n-gi>
    <n-gi>
      <div class="gi drag" />
    </n-gi>
    <n-gi>
      <div class="gi operate">
        <!-- <n-button strong secondary circle type="error" size="tiny" class="close-btn">
          <template #icon>
            <n-icon><Close /></n-icon>
          </template>
        </n-button> -->
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
import { Close } from "@vicons/ionicons5";
async function closewin() {
  await window.$elec.closewin();
}
</script>

<style scoped>
.drag {
  -webkit-app-region: drag;
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
  justify-content: flex-end;
}
.close-btn {
  cursor: pointer;
}
</style>
