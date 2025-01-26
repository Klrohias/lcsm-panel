<script lang="tsx" setup>
import { NLayout, NLayoutHeader, NMenu, useOsTheme } from 'naive-ui'
import { RouterLink } from 'vue-router';
import { computed } from 'vue'
import { useUserCredential } from '@/stores/userCred'
import logoLight from '@/assets/lcsm-logo-light.png'
import logoDark from '@/assets/lcsm-logo-dark.png'

const themeId = useOsTheme()
const usedLogo = computed(() => themeId.value == 'dark' ? logoDark : logoLight)
const userCred = useUserCredential()

const props = withDefaults(defineProps<{
  embedded?: boolean
}>(), {
  embedded: true
})

const menuOptions = [
  {
    label: () => <RouterLink to="/"><img src={usedLogo.value} style="max-height: 2.5rem" /></RouterLink>,
    key: 'logo',
  },
  ...(userCred.isAlreadySignedIn() ? [{
    label: () => <RouterLink to="/">仪表板</RouterLink>,
    key: 'home',
  },
  {
    label: () => <RouterLink to="/instances">实例管理</RouterLink>,
    key: 'instances',
  }] : []),
  ...(userCred.isAdministrator ? [
    {
      label: '管理',
      key: 'admin',
      children: [
        {
          label: () => <RouterLink to="/runners">节点管理</RouterLink>,
          key: 'runners',
        },
        {
          label: () => <RouterLink to="/users">用户管理</RouterLink>,
          key: 'users',
        }
      ]
    },
  ] : [])
]
</script>

<template>
  <n-layout position="absolute" :embedded="props.embedded">
    <n-layout-header bordered :style="{ padding: '1em' }">
      <n-menu :options="menuOptions" responsive mode="horizontal" />
    </n-layout-header>

    <n-layout :native-scrollbar="false" :embedded="props.embedded">
      <slot></slot>
    </n-layout>
  </n-layout>
</template>