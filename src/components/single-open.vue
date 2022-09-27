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
      <n-popselect :options="options" trigger="hover" @update:value="(op: string) => selectHandler(op, item, index)">
        <n-button
          @dblclick="openExe(item)"
          strong
          secondary
          :type="item.isApp ? 'success' : 'info'"
          class="selectBtn"
        >
          <n-ellipsis style="max-width: 100%; min-width: 100px">
            {{ item.name }}
          </n-ellipsis>
        </n-button>
      </n-popselect>
    </n-h3>
  </n-card>
  <projectDialogVue ref="dialogRef"></projectDialogVue>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useStore } from 'vuex';
import {  AppOrProject } from '../store/indexDB';
import { useMessage, useDialog } from 'naive-ui';
import projectDialogVue from './project-dialog.vue';
import { computed } from '@vue/reactivity';
import {openExe} from '@/hook'
let message = useMessage();
let dialog = useDialog();
const store = useStore();
const projectData = computed(() => store.state.projectData);
const appData = computed(() => store.state.appData);

const dialogRef = ref();
// 命令
let options = reactive([
  {
    label: '启动',
    value: '启动'
  },
  {
    label: '修改',
    value: '修改'
  },
  {
    label: '删除',
    value: '删除'
  }
]);
let ListData = computed((): Array<AppOrProject> => {
  const newArr = [...projectData.value, ...appData.value];
  return newArr;
});

function selectHandler(op: string, itemData: AppOrProject, index: number) {
  switch (op) {
    case '启动':
      openExe(itemData);
      break;
    case '修改':
      openChangeModel(itemData);
      break;
    case '删除':
      confirmDeletion(itemData);
      break;
    default:
      break;
  }
}

function openChangeModel(itemData: AppOrProject) {
  dialogRef.value.openModel(itemData, 'edit');
}
// 确认删除
function confirmDeletion(data: AppOrProject) {
  dialog.warning({
    title: '警告',
    content: '你确定删除？',
    positiveText: '确定',
    negativeText: '不确定',
    onPositiveClick: () => {
      store.dispatch('delAction', data);
      message.success('确定');
    },
    onNegativeClick: () => {
      message.error('不确定');
    }
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
