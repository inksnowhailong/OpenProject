<template>
  <!-- 左侧启动单项的项目 -->
  <n-card embedded>
    <n-h3
      prefix="bar"
      align-text
      type="info"
      v-for="(item, index) in [...projectData, ...appData]"
      :key="index"
    >
      <n-text type="info">{{ item.name }}</n-text>
    </n-h3>
  </n-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";

export default defineComponent({
  name: "single-open",
  computed: {
    ...mapState({
      projectData: "projectData",
      appData: "appData",
    }),
  },
});
</script>

<style scoped>
.n-card {
  height: 100%;
}
.n-h3 {
  text-align: left;
}
</style>
