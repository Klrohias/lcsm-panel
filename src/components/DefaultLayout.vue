<script lang="tsx" setup>
import { NLayout, NLayoutHeader, NButton, NMenu } from 'naive-ui';
import { RouterLink } from 'vue-router';

const menuOptions = [
  {
    label: () => <RouterLink to="/">LCSM</RouterLink>,
    key: 'logo',
  },
  {
    label: () => <RouterLink to="/instances">实例管理</RouterLink>,
    key: 'instances',
  },
]
</script>

<template>
  <n-layout position="absolute">
    <n-layout-header bordered :style="{ padding: '1em' }">
      <n-menu :options="menuOptions" responsive mode="horizontal" />
    </n-layout-header>

    <n-layout :native-scrollbar="false">
      <slot></slot>
    </n-layout>
  </n-layout>
</template>