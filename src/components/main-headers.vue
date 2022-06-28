<template>
  <electronHeader></electronHeader>
  <n-h3 @drop="handleDrop" @dragover.stop.prevent v-bind="$attrs">
    <n-text type="primary">
      将你的
      <n-text type="info">项目文件夹</n-text>
      或者要启动的
      <n-text type="info">应用程序（如.exe）</n-text
      >拖拽至此处以添加新的启动项,一次请只添加一个</n-text
    >
  </n-h3>
  <n-modal v-model:show="showModal" preset="dialog" :rules="rules">
    <template #header>
      <div>标题</div>
    </template>
    <n-form ref="formRef" :label-width="80" :model="fileData">
      <n-form-item label="项目名称" path="name">
        <n-input v-model:value="fileData.name" placeholder="项目名称" />
      </n-form-item>
      <n-form-item label="项目地址" path="path">
        <n-input v-model:value="fileData.path" placeholder="项目地址" />
      </n-form-item>
      <n-form-item label="类型" path="isApp">
        <n-switch v-model:value="fileData.isApp">
          <template #checked> 这个是一个应用程序</template>
          <template #unchecked> 这是一个项目目录</template>
        </n-switch>
      </n-form-item>
      <n-form-item label="运行命令" path="code" v-if="!fileData.isApp">
        <n-input v-model:value="fileData.code" placeholder="项目目录下的启动命令" />
      </n-form-item>
    </n-form>
    <template #action>
      <n-button type="primary" @click="saveNewProject"> 保存 </n-button>
    </template>
  </n-modal>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, defineAsyncComponent } from "vue";
import { useStore } from "vuex";
type fileType = {
  name: string;
  path: string;
  isApp: boolean;
  code?: string;
};
export default defineComponent({
  setup() {
    const store = useStore();

    // 文件数据
    let fileData = reactive({ name: "", path: "", isApp: true } as fileType);
    // 弹窗
    let showModal = ref(false);
    const formRef = ref();

    return {
      showModal,
      fileData,
      formRef,
      rules: {
        name: {
          required: true,
          message: "请输入项目名称",
          trigger: ["input", "blur"],
        },
        path: {
          required: true,
          message: "请输入项目名称",
          trigger: ["input", "blur"],
        },
      },
      // 收集拖入的文件信息
      handleDrop(e: DragEvent) {
        if (e.dataTransfer) {
          const file = e.dataTransfer.files[0];
          fileData.name = file.name;
          fileData.path = file.path;
          showModal.value = true;
        }
      },
      saveNewProject() {
        // 提交vueX
        store.dispatch("addAction", fileData);
        // 重置
        formRef.value.restoreValidation();
        fileData.name = "";
        fileData.path = "";
        fileData.isApp = true;
        fileData.code = "";
        showModal.value = false;
      },
    };
  },
  components: {
    electronHeader: defineAsyncComponent(() => import("./electron-header.vue")),
  },
});
</script>

<style scoped>
.n-h3 {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 0 auto;
  border: 2px #dcdfe6 dashed;
  border-radius: 4px;
  box-sizing: border-box;
}
</style>
