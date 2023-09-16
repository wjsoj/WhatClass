import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', () => {
  const appTheme = ref('system')
  const isDark = ref(false)

  return { appTheme,isDark }
})
