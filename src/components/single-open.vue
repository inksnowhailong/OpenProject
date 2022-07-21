<template>
  <!-- 左侧启动单项的项目 -->
  <n-card embedded>
    <n-h3
      prefix="bar"
      align-text
      :type="item.isApp ? 'success' : 'info'"
      v-for="(item, index) in ListData"
      :key="item.id"
      class="listItem"
    >
      <n-popselect
        :options="options"
        trigger="hover"
        @update:value="(op: string) => selectHandler(op, item, index)"
      >
        <n-button
          @dblclick="openExe(item, index)"
          strong
          secondary
          :type="item.isApp ? 'success' : 'info'"
          class="selectBtn"
          >{{ item.name }}
        </n-button>
      </n-popselect>
    </n-h3>
  </n-card>
  <projectDialogVue ref="dialogRef"></projectDialogVue>
</template>

<script lang="ts" setup>
import { defineComponent, reactive, ref } from "vue";
import { mapActions, mapState, useStore } from "vuex";
import { ProgectType, AppOrProject } from "../store/indexDB";
import { useMessage, useDialog } from "naive-ui";
import projectDialogVue from "./project-dialog.vue";
import { computed } from "@vue/reactivity";
let message = useMessage();
let dialog = useDialog();
const store = useStore();
const projectData = computed(() => store.state.projectData);
const appData = computed(() => store.state.appData);

const dialogRef = ref();
// 命令
let options = reactive([
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
]);
let ListData = computed((): Array<AppOrProject> => {
  const newArr = [...projectData.value, ...appData.value];
  return newArr;
});

function selectHandler(op: string, itemData: AppOrProject, index: number) {
  switch (op) {
    case "启动":
      openExe(itemData, index);
      break;
    case "修改":
      openChangeModel(itemData);
      break;
    case "删除":
      confirmDeletion(itemData);
      break;
    default:
      break;
  }
}
// 启动程序或项目
async function openExe(itemData: AppOrProject, index: number) {
  if (itemData.isApp) {
    const { path, name } = itemData;
    const data = await window.$elec.openApp({
      path,
      name,
    });
    console.log(data);
  } else {
    const { path, name, code } = itemData as ProgectType;
    const data = await window.$elec.openProject({
      code,
      path,
      name,
    });
  }
}
function openChangeModel(itemData: AppOrProject) {
  dialogRef.value.openModel(itemData, "edit");
}
// 确认删除
function confirmDeletion(data: AppOrProject) {
  dialog.warning({
    title: "警告",
    content: "你确定删除？",
    positiveText: "确定",
    negativeText: "不确定",
    onPositiveClick: () => {
      store.dispatch("delAction",data.id);
      message.success("确定");
    },
    onNegativeClick: () => {
      message.error("不确定");
    },
  });
}
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
