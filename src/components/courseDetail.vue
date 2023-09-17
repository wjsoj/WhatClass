<script setup>
import { ref } from 'vue'
let data = defineProps({
  course: {
    type: Object,
    required: true,
  },
  isHide: {
    type: Boolean,
    required: false,
    default: false,
  }
})
let course = data.course
let isHide = data.isHide
let isOpen = ref(false)
// 将course.time按照空格分割成数组，如果长度大于2,每2个元素为一组，用br连接
let time = course.time.split(' ').filter((item) => {
  return item !== ''
})
let timeArr = []
for (let i = 0; i < time.length; i += 2) {
  timeArr.push(time.slice(i, i + 2).join(' '))
}
course.time = timeArr.join('<br>')
</script>

<template>
<div class=" rounded-lg px-4 py-2 bg-gradient-to-br from-slate-100 to-slate-300 dark:from-slate-700 dark:to-slate-900 flex flex-col justify-center items-start w-full my-2 border dark:border-sky-200 border-sky-800">
  <h1 class="text-gradient font-semibold text-xl my-1">
    {{ course.name }}
  </h1>
  <h2 class="text-slate-900 dark:text-slate-100 my-1" v-if="course.teacher">
    授课教师：{{ course.teacher }}
  </h2>

  <div v-if="!isHide || isOpen">
    <h2 class="text-slate-900 dark:text-slate-100 my-1 flex flex-row">
      <div class=" shrink-0">时间地点：</div>
      <div v-html="course.time"></div>
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
    <h2 class="text-slate-900 dark:text-slate-100 my-1 flex flex-row" v-if="course.note">
      <div class=" shrink-0">备注信息：</div>
      <div>{{ course.note }}</div>
    </h2>
  </div>

  <p class="text-sky-800 dark:text-sky-200 my-1 self-end cursor-pointer" v-text="isOpen ? '- Hide' : '+ View More'" @click="isOpen=!isOpen"></p>
</div>
</template>