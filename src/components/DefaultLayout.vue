<script lang="tsx" setup>
import { NIcon, NLayout, NLayoutHeader, NMenu, NButton } from 'naive-ui'
import { RouterLink } from 'vue-router';
import { computed } from 'vue'
import { useUserCredential } from '@/stores/userCred'
import logoLight from '@/assets/lcsm-logo-light.png'
import logoDark from '@/assets/lcsm-logo-dark.png'
import { useAppearanceStore } from '@/stores/appearance'
import { WeatherSunny16Regular, Lightbulb16Regular, WeatherMoon16Regular } from '@vicons/fluent'

const appearanceStore = useAppearanceStore()

const logoSrc = computed(() => appearanceStore.resolve() == 'dark' ? logoDark : logoLight)
const userCred = useUserCredential()

const props = withDefaults(defineProps<{
  embedded?: boolean
}>(), {
  embedded: true
})

const menuOptions = [
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
      label: '管理员',
      key: 'admin',
      children: [
        {
          label: () => <RouterLink to="/admin/runners">节点管理</RouterLink>,
          key: 'runners',
        },
        {
          label: () => <RouterLink to="/admin/users">用户管理</RouterLink>,
          key: 'users',
        },
        {
          label: () => <RouterLink to="/admin/instances">实例管理</RouterLink>,
          key: 'instances',
        },
        {
          label: () => <RouterLink to="/admin/api">API 管理</RouterLink>,
          key: 'api',
        }
      ]
    },
  ] : [])
]
</script>

<template>
  <n-layout position="absolute" :embedded="props.embedded">
    <n-layout-header bordered :style="{ padding: '1em' }">
      <div class="navbar">
        <img :src="logoSrc" style="max-height: 2.5rem" />
        <n-menu :options="menuOptions" responsive mode="horizontal" class="navbar-menu" />
        <n-button text @click="appearanceStore.toggleAppearance">
          <n-icon size="18">
            <weather-sunny16-regular v-if="appearanceStore.appearance == 'light'" />
            <weather-moon16-regular v-if="appearanceStore.appearance == 'dark'" />
            <lightbulb16-regular v-if="appearanceStore.appearance == 'system'" />
          </n-icon>
        </n-button>
      </div>
    </n-layout-header>

    <n-layout :native-scrollbar="false" :embedded="props.embedded">
      <slot></slot>
    </n-layout>
  </n-layout>
</template>

<style lang="css" scoped>
.navbar {
  display: flex;
  align-items: center;
}

.navbar-menu {
  flex-grow: 1;
}
</style>