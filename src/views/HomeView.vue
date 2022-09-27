<template>
  <appProvider>
      <n-layout class="main-layout">
        <n-layout-header>
          <!-- 头部 -->
          <main-headers></main-headers>
        </n-layout-header>
        <n-layout has-sider class="content-layout" :native-scrollbar="false" :content-style="{ height: '100%' }">
          <n-layout-sider
            width="25%"
            style="min-width: 150px; max-width: 300px"
            :native-scrollbar="false"
            :content-style="{ height: '100%' }"
          >
            <!-- 侧边 -->
            <SingleOpen></SingleOpen>
          </n-layout-sider>
          <n-layout-content content-style="padding: 24px;" :native-scrollbar="false">
            <!-- 主体 -->
            <CombinationCard></CombinationCard>
          </n-layout-content>
        </n-layout>
      </n-layout>
  </appProvider>
</template>

<script lang="ts" setup>
import MainHeaders from '../components/main-headers.vue';
import appProvider from '@/components/app-provider.vue';
import CombinationCard from '@/components/combination-card.vue';
import SingleOpen from '@/components/single-open.vue';
// import { useMessage } from 'naive-ui';
// useMessage()
</script>
<style scoped>
.home .drag-box {
  width: 400px;
  height: 400px;
  border: 1px dashed #999;
  margin: 0 auto;
}

.n-layout-header {
  height: 80px;
  padding: 0 5px;
  box-sizing: border-box;
}

.main-layout,
.n-layout-sider {
  height: 100%;
}
.main-layout {
  height: 100vh;
  overflow: hidden;
}
.content-layout {
  position: relative;
  height: var(--main-height);
}
</style>
