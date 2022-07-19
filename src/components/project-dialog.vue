<template>
  <div>
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
            <template #checked>这个是一个应用程序</template>
            <template #unchecked>这是一个项目目录</template>
          </n-switch>
        </n-form-item>
        <n-form-item label="运行命令" path="code" v-if="!fileData.isApp">
          <n-input
            v-model:value="fileData.code"
            placeholder="项目目录下的启动命令"
          />
        </n-form-item>
      </n-form>
      <template #action>
        <n-button type="primary" @click="saveNewProject">保存</n-button>
      </template>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, defineExpose, toRaw } from "vue";
import { useStore } from "vuex";
type fileType = {
  name: string;
  path: string;
  isApp: boolean;
  code?: string;
  id?: number;
};
type fileDataType = {
  name: string;
  path: string;
  isApp?: boolean;
  code?: string;
};
const store = useStore();

let rules = {
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
};
// 文件数据
let fileData = ref<fileType>({ name: "", path: "", isApp: true });
// 弹窗
let showModal = ref(false);
// 拿取form
const formRef = ref();

// 父组件获取了文件信息 在此触发显示弹出
function openModel(file: fileDataType, type = "add") {
  // add或者edit
  if (type === "edit") {
    //修改
    fileData.value = file as fileType;
  } else {
    //添加
    fileData.value.name = file.name;
    fileData.value.path = file.path;
  }
  // 打开窗口
  showModal.value = true;
}
// 保存项目信息
function saveNewProject() {
  // 提交添加或跟更新  需要传递原始值  ref对对象使用时候 会是一个refimpl 里面再套个proxy
  store.dispatch("putAction", toRaw(fileData.value));
  // // 重置
  formRef.value.restoreValidation();
  // fileData.value.name = "";
  // fileData.value.path = "";
  // fileData.value.isApp = true;
  // fileData.value.code = "";
  showModal.value = false;
}
// 暴露出去打开方法
defineExpose({
  openModel,
});
</script>
<style scoped></style>
