<script setup>
import { onMounted } from 'vue'
import { useThemeStore } from './stores/theme'
import { storeToRefs } from 'pinia'
import { NConfigProvider,darkTheme,NLoadingBarProvider,NMessageProvider,NDialogProvider } from 'naive-ui'
import mainApp from './components/mainApp.vue'

const { appTheme,isDark } = storeToRefs(useThemeStore())

onMounted(() => {
  if ('theme' in localStorage) {
    appTheme.value = localStorage.theme
    if (localStorage.theme === 'dark') {
      isDark.value = true
    } else {
      isDark.value = false
    }
  } else {
    appTheme.value = 'system'
    if (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      isDark.value = true
    } else {
      isDark.value = false
    }
  }
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
})
</script>

<template>
  <n-config-provider :theme="isDark ? darkTheme : undefined">
    <n-loading-bar-provider>
      <n-message-provider>
        <n-dialog-provider>
          <mainApp />
        </n-dialog-provider>
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>
