<script setup>
import { useDark } from '@vueuse/core'
import { NConfigProvider,darkTheme,NLoadingBarProvider,NMessageProvider,NDialogProvider } from 'naive-ui'
import mainApp from './components/mainApp.vue'

const isDark = useDark()
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
