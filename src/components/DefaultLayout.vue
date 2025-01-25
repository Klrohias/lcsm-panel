<script lang="ts" setup>
import { NLayout, NLayoutHeader, NButton } from 'naive-ui';
</script>

<template>
  <n-layout position="absolute">
    <n-layout-header bordered :style="{ padding: '1em' }">
      <router-link to="/">
        <n-button text>
          LCSM
        </n-button>
      </router-link>
    </n-layout-header>

    <n-layout :native-scrollbar="false">
      <slot></slot>
    </n-layout>
  </n-layout>
</template>