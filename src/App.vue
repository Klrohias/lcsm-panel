<script setup lang="ts">
import { darkTheme, NConfigProvider, NLoadingBarProvider, NDialogProvider, NMessageProvider, useOsTheme, lightTheme } from 'naive-ui'
import { computed } from 'vue'
import Presenter from './Presenter.vue';
import { useAppearanceStore } from './stores/appearance'

const appearanceStore = useAppearanceStore()
const theme = computed(() => appearanceStore.resolve() == 'dark' ? darkTheme : lightTheme)

</script>

<template>
  <n-config-provider :theme="theme">
    <n-message-provider>
      <n-dialog-provider>
        <n-loading-bar-provider>
          <presenter />
        </n-loading-bar-provider>
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>