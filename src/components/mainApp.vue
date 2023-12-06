<script setup>
import { SunRegular,MoonRegular,Github } from '@vicons/fa'
import { useDark,useToggle } from '@vueuse/core'
import { NBackTop } from 'naive-ui'
import { useRouter } from 'vue-router'
// import foot from './foot.vue'

const router = useRouter()
const isDark = useDark()
const toggleDark = useToggle(isDark)

function goGithub() {
  window.open('https://github.com/wjsoj/WhatClass')
}
</script>

<template> 
<div class="flex flex-col min-h-screen">
<header class="z-10 sticky top-0 backdrop-blur flex flex-row justify-between px-6 py-4 bg-slate-200 dark:bg-slate-700 bg-opacity-60 border-b border-b-slate-200 dark:border-b-slate-800 transition ease-in-out">
  <h1 class=" bg-clip-text text-transparent bg-gradient-to-r from-cyan-700 to-pink-700 dark:from-amber-300 dark:to-teal-200 text-2xl font-semibold cursor-pointer" @click="router.push('/')">What Class</h1>
  <div class="flex flex-row">
    <div @click="toggleDark()">
      <MoonRegular v-if="isDark" class="w-6 h-6 mt-1 text-slate-800 dark:text-slate-50" />
      <SunRegular v-else class="w-6 h-6 mt-1 text-slate-800 dark:text-slate-50" />
    </div>
    <Github class="w-6 h-6 mt-1 ml-4 text-slate-800 dark:text-slate-50 cursor-pointer" @click="goGithub"/>
  </div>
</header>

<div class="flex-grow">
<router-view v-slot="{ Component }">
  <transition name="fade">
    <component :is="Component" />
  </transition>
</router-view>
</div>

<n-back-top :right="20" :bottom="30"/>

<!-- <foot /> -->
</div>
</template>