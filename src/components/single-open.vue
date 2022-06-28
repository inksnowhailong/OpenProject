<template>
  <!-- 左侧启动单项的项目 -->
  <n-card embedded>
    <n-h3
      prefix="bar"
      align-text
      type="info"
      v-for="(item, index) in ListData"
      :key="item.id"
      class="listItem"
    >
      <n-popselect
        :options="options"
        trigger="hover"
        @update:value="(op:string) => selectHandler(op, item, index)"
      >
        <n-button
          @dblclick="openExe(item, index)"
          strong
          secondary
          type="info"
          class="selectBtn"
          >{{ item.name }}</n-button
        >
      </n-popselect>
    </n-h3>
  </n-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";
import { ProgectType, AppOrProject } from "../store/indexDB";
import { useMessage, useDialog } from "naive-ui";
export default defineComponent({
  name: "single-open",
  setup() {
    return {
      message: useMessage(),
      dialog: useDialog(),
    };
  },
  data() {
    return {
      options: [
        {
          label: "启动",
          value: "启动",
        },
        {
          label: "修改",
          value: "修改",
        },
        {
          label: "删除",
          value: "删除",
        },
      ],
    };
  },
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

  methods: {
    ...mapActions({
      delAction: "delAction",
    }),
    selectHandler(op: string, itemData: AppOrProject, index: number) {
      switch (op) {
        case "启动":
          this.openExe(itemData, index);
          break;
        case "删除":
          this.confirmDeletion(itemData);
          break;
        default:
          break;
      }
    },
    // 启动程序或项目
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
    // 确认删除
    confirmDeletion(data: AppOrProject) {
      this.dialog.warning({
        title: "警告",
        content: "你确定删除？",
        positiveText: "确定",
        negativeText: "不确定",
        onPositiveClick: () => {
          this.delAction(data);
          this.message.success("确定");
        },
        onNegativeClick: () => {
          this.message.error("不确定");
        },
      });
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
.selectBtn {
  width: 100%;
}
</style>
