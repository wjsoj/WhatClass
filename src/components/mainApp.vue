<script setup>
import { SunRegular,MoonRegular,TabletAlt,Github } from '@vicons/fa'
import { useThemeStore } from '../stores/theme'
import { storeToRefs } from 'pinia'
import { NDropdown,NBackTop } from 'naive-ui'
import { useRouter } from 'vue-router'
import foot from './foot.vue'

const router = useRouter()
const { appTheme,isDark } = storeToRefs(useThemeStore())

const options = [
  {
    label: 'Light',
    key: 'light'
  },
  {
    label: 'Dark',
    key: 'dark'
  },
  {
    label: 'System',
    key: 'system'
  }
]

function changeTheme(key) {
  appTheme.value = key
  if (key === 'dark') {
    isDark.value = true
    document.documentElement.classList.add('dark')
    localStorage.theme = 'dark'
  } else if (key === 'light') {
    isDark.value = false
    document.documentElement.classList.remove('dark')
    localStorage.theme = 'light'
  } else {
    localStorage.removeItem('theme')
    if (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      isDark.value = true
      document.documentElement.classList.add('dark')
    } else {
      isDark.value = false
      document.documentElement.classList.remove('dark')
    }
  }
}

function goGithub() {
  window.open('https://github.com/wjsoj/WhatClass')
}
</script>

<template> 
<header class="z-10 sticky top-0 backdrop-blur flex flex-row justify-between px-6 py-4 bg-slate-200 dark:bg-slate-700 bg-opacity-60 border-b border-b-slate-200 dark:border-b-slate-800 transition ease-in-out">
  <h1 class=" text-gradient text-2xl font-semibold cursor-pointer" @click="router.push('/')">What Class</h1>
  <div class="flex flex-row">
    <n-dropdown trigger="click" :options="options" @select="changeTheme">
      <MoonRegular v-if="isDark" class="w-6 h-6 mt-1 text-slate-800 dark:text-slate-50" />
      <SunRegular v-else class="w-6 h-6 mt-1 text-slate-800 dark:text-slate-50" />
    </n-dropdown>
    <Github class="w-6 h-6 mt-1 ml-4 text-slate-800 dark:text-slate-50" @click="goGithub"/>
  </div>
</header>

<router-view v-slot="{ Component }">
  <transition name="fade">
    <component :is="Component" />
  </transition>
</router-view>

<!-- <n-back-top :right="20" :bottom="30"/> -->

<foot />

</template>