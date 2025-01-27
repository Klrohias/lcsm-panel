import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useOsTheme } from 'vooks'

export const useAppearanceStore = defineStore('appearance', () => {
  type Appearance = 'light' | 'dark' | 'system'
  const appearance = ref<Appearance>('system')

  function toggleAppearance() {
    console.log('toggle', appearance.value)
    switch (appearance.value) {
      case 'light':
        appearance.value = 'dark'
        break
      case 'dark':
        appearance.value = 'system'
        break
      case 'system':
        appearance.value = 'light'
        break
    }
  }

  function resolve(): Appearance {
    if (appearance.value == 'system') {
      return useOsTheme().value as Appearance
    }
    return appearance.value
  }

  return { appearance, toggleAppearance, resolve }
}, { persist: true })
