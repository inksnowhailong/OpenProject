<template>
  <n-scrollbar style="max-height: 100%">
    <n-space vertical>
      <n-card
        v-for="batch in batchData"
        :key="batch.id"
        :title="batch.name || '未命名'"
        size="small"
        hoverable
        @dblclick="openExeList(batch)"
      >
        <template #header-extra>
          <n-button-group>
            <n-button ghost @click="showEdit"> 修改 </n-button>
            <n-popconfirm @positive-click="delBatch(batch)">
              <template #trigger>
                <n-button ghost> 删除 </n-button>
              </template>
              删除了的话，这个组合就莫得了
            </n-popconfirm>
          </n-button-group>
        </template>
        <n-space>
          <n-tag type="info" v-for="data in batch.list" :key="data.id">{{ data.name }}</n-tag></n-space
        >
      </n-card>
    </n-space>
  </n-scrollbar>

  <n-button strong secondary type="info" class="new-card" @click="showAdd">
    <template #icon>
      <n-icon>
        <AddCircleOutline />
      </n-icon> </template
    >添加新组合</n-button
  >
  <n-modal
    v-model:show="showModal"
    preset="card"
    :title="modalStatus === 'add' ? '添加新组合' : '修改组合'"
    class="transfer-modal"
    :on-after-leave="afterLeave"
    :segmented="{
      content: true,
      footer: 'soft'
    }"
  >
    <n-space vertical>
      <n-input v-model:value="combinationName" type="text" placeholder="请输入组合名称" />
      <n-transfer ref="transfer" v-model:value="transferData" :options="allSelectOptions" />
    </n-space>
    <template #footer>
      <n-button type="primary" class="addBtn" v-if="modalStatus === 'add'" @click="combinationAdd"> 确定添加 </n-button>
      <n-button type="warning" class="addBtn" v-else> 确定修改 </n-button>
    </template>
  </n-modal>
</template>

<script setup lang="ts">
import { AppOrProject, BatchType } from '@/store/indexDB';
import { AddCircleOutline } from '@vicons/ionicons5';
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { openExe } from '@/hook';
const store = useStore();
const projectData = computed(() => store.state.projectData);
const appData = computed(() => store.state.appData);
const batchData = computed(() => store.state.batchData);

// 显示模态框
const showModal = ref(false);
// 模态框状态
const modalStatus = ref('add');
// 数据流转
const transferData = ref([]);
// 组合名称
const combinationName = ref('');
// 所有已加入的启动项目
const allSelectOptions = computed(() => {
  const newArr: AppOrProject[] = [...projectData.value, ...appData.value];
  return newArr.map((item) => {
    return {
      label: item.name,
      value: JSON.stringify(item) ///组件要求这个地方只能是字符串或数字
    };
  });
});
// 模态框关闭后
function afterLeave() {
  transferData.value.length = 0;
  combinationName.value = '';
}
// 显示开启
function showAdd() {
  modalStatus.value = 'add';
  showModal.value = true;
}
// 显示修改
function showEdit() {
  modalStatus.value = 'edit';
  showModal.value = true;
}
// 确认添加
function combinationAdd() {
  if (transferData.value.length > 0) {
    store.dispatch('addNewBatch', {
      name: combinationName.value,
      list: transferData.value.map((item: string) => {
        return JSON.parse(item);
      }) as AppOrProject[]
    });
  }
  // 关闭弹窗
  showModal.value = false;
}
// 确认删除组合
function delBatch(batch: BatchType) {
  store.dispatch('delBatch', batch.id);
}
function openExeList(batchData: BatchType) {
  for (const project of batchData.list) {
    openExe(project);
  }
}
</script>

<style scoped>
.n-card {
  cursor: pointer;
}
.new-card {
  position: fixed;
  top: 150px;
  right: 0px;
}
</style>
<style>
.transfer-modal {
  width: max-content;
}
</style>
