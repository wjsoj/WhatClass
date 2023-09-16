<script setup>
let data = defineProps(['course'])
let course = data.course
</script>

<template>
<div class=" rounded-lg px-4 py-2 bg-gradient-to-br from-slate-100 to-slate-300 dark:from-slate-700 dark:to-slate-900 flex flex-col justify-center items-start w-full my-2 border dark:border-sky-200 border-sky-800">
  <h1 class="text-gradient font-semibold text-xl my-1">
    {{ course.name }}
  </h1>
  <h2 class="text-slate-900 dark:text-slate-100 my-1" v-if="course.teacher">
    授课教师：{{ course.teacher }}
  </h2>
  <h2 class="text-slate-900 dark:text-slate-100 my-1">
    时间地点：<span>{{ course.time }}</span>
  </h2>
  <h2 class="text-slate-900 dark:text-slate-100 my-1" v-if="course.category">
    所属类别：{{ course.category }}
  </h2>
  <h2 class="text-slate-900 dark:text-slate-100 my-1" v-if="course.school">
    开设单位：{{ course.school }}
  </h2>
  <h2 class="text-slate-900 dark:text-slate-100 my-1" v-if="course.major">
    所属专业：{{ course.major }}
  </h2>
</div>
</template>