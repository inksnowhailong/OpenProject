<template>
  <!-- 左侧启动单项的项目 -->
  <n-card embedded>
    <n-h3 prefix="bar" align-text type="info">
      <n-text type="info"> sin(x) </n-text>
    </n-h3>
  </n-card>
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
