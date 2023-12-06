<script setup>
import { NEllipsis } from 'naive-ui'
</script>

<template>
<footer class="bg-slate-200 dark:bg-slate-700 px-6 py-4 transition ease-in-out">
  <div class="flex flex-row justify-center items-center">
    <div class="flex flex-col justify-center items-start">
      <p class="text-slate-900 dark:text-slate-100 text-sm">Copyright 2023 By <span class="bg-clip-text text-transparent bg-gradient-to-r from-cyan-700 to-pink-700 dark:from-amber-300 dark:to-teal-200 font-bold">WJS</span>.</p>
      <p class="text-slate-900 dark:text-slate-100 text-sm ">
        <n-ellipsis expand-trigger="click" line-clamp="1" :tooltip="true">
          Made With Unbearable aversion to the Unacceptable Interactive Design level of Elective2008.
        </n-ellipsis>
      </p>
    </div>
  </div>
</footer>

</template>