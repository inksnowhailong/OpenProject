<template>
  <!-- 左侧启动单项的项目 -->
  <n-card title="卡片"> 卡片内容 </n-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "single-open",
  setup() {
    return {};
  },
});
</script>

<style scoped>
.n-card {
  height: 100%;
}
</style>
