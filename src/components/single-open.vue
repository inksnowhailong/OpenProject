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
      <n-button strong secondary circle type="info">
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

export default defineComponent({
  name: "single-open",
  computed: {
    ListData() {
      let newArr = [...this.projectData, ...this.appData];
      return newArr;
    },
    ...mapState({
      projectData: "projectData",
      appData: "appData",
    }),
  },
  components: {
    Play,
  },
  methods: {},
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
