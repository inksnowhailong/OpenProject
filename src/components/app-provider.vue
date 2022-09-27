<template>
  <!-- <n-loading-bar-provider> -->
  <n-config-provider :locale="locale" :date-locale="dateZhCN">
    <n-dialog-provider>
      <n-message-provider>
        <message-content>
          <slot></slot>
        </message-content>
      </n-message-provider>
    </n-dialog-provider>
  </n-config-provider>
  <!-- </n-loading-bar-provider> -->
</template>

<script lang="ts" setup>
import { NConfigProvider, createLocale, zhCN, dateZhCN } from 'naive-ui';
import MessageContent from './MessageContent.vue';
const locale = createLocale(
  {
    Input: {}
  },
  zhCN
);
</script>
