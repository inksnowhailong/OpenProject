<template>
        <slot></slot>
</template>

<script setup lang="ts">
import { useMessage } from 'naive-ui';
let message: TMessageBase = useMessage();
interface TMessageBase {
  create: any;
  destroyAll: any;
  error: any;
  info: any;
  loading: any;
  success: any;
  warning: any;
  [key: string]: any;
}
window.$message = {}
Object.keys(message).forEach((item) => {
  window.$message[item] = message[item];
});
</script>

<style scoped>

</style>
