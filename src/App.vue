<script setup lang="ts">
import { darkTheme, NConfigProvider, NLoadingBarProvider, NMessageProvider, useOsTheme } from 'naive-ui'
import { computed } from 'vue'
import Presenter from './Presenter.vue';

const themeId = useOsTheme()
const theme = computed(() => themeId.value == 'dark' ? darkTheme : null)

</script>

<template>
  <n-config-provider :theme="theme">
    <n-message-provider>
      <n-loading-bar-provider>
        <presenter />
      </n-loading-bar-provider>
    </n-message-provider>
  </n-config-provider>
</template>