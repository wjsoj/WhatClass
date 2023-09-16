<script setup>
import { NInputNumber,NInput,NCheckbox,NSpin,useMessage,useLoadingBar,useDialog } from 'naive-ui'
import { computed, ref, watch, onUpdated, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AV from 'leancloud-storage'
import courseDetail from './courseDetail.vue'

const router = useRouter()
let classTime = ref(null)
let classWeekDay = ref(null)
let classPlace = ref(null)
let isNow = ref(false)
let isLoading = ref(false)

let countResult = ref(0)
let result = ref([])

let supposeTime = computed(() => {
  let now = new Date()
  let hour = now.getHours()
  let minute = now.getMinutes()
  if (hour < 8 || hour > 21) {
    return 1
  } else if (hour === 8) {
    if (minute < 50) {
      return 1
    } else {
      return 2
    }
  } else if (hour === 9) {
    if (minute < 50) {
      return 2
    } else {
      return 3
    }
  } else if (hour === 10) {
    return 3
  } else if (hour === 11) {
    return 4
  } else if (hour === 12) {
    return 5
  } else if (hour === 13) {
    if (minute < 50) {
      return 5
    } else {
      return 6
    }
  } else if (hour === 14) {
    if (minute < 50) {
      return 6
    } else {
      return 7
    }
  } else if (hour === 15) {
    return 7
  } else if (hour === 16) {
    return 8
  } else if (hour === 17) {
    return 9
  } else if (hour === 18) {
    return 10
  } else if (hour === 19) {
    if (minute < 30) {
      return 10
    } else {
      return 11
    }
  } else if (hour === 20) {
    if (minute < 30) {
      return 11
    } else {
      return 12
    }
  } else if (hour === 21) {
    return 12
  }
})
let nowWeek = computed(() => {
  let now = new Date()
  let week = now.getDay()
  if (week === 0) {
    return 7
  } else {
    return week
  }
})
let message = useMessage()
let loadingBar = useLoadingBar()
let dialog = useDialog()

watch(classTime, (value) => {
  if (classTime.value !== supposeTime.value) {
    isNow.value = false
  }
})
watch(classWeekDay, (value) => {
  if (classWeekDay.value !== nowWeek.value) {
    isNow.value = false
  }
})

watch(isNow, (value) => {
  if (value) {
    classTime.value = supposeTime.value
    classWeekDay.value = nowWeek.value
  }
})

async function queryClass() {
  let query = new AV.Query('course')
  result.value = []
  // 把classWeekDay转成汉字
  let weekDay = ''
  switch (classWeekDay.value) {
    case 1:
      weekDay = '一'
      break
    case 2:
      weekDay = '二'
      break
    case 3:
      weekDay = '三'
      break
    case 4:
      weekDay = '四'
      break
    case 5:
      weekDay = '五'
      break
    case 6:
      weekDay = '六'
      break
    case 7:
      weekDay = '日'
      break
  }
  // 如果其中一项为空
  if (classTime.value === null || classWeekDay.value === null || classPlace.value === null) {
    message.error('请填写所有信息')
    return
  }
  isLoading.value = true
  loadingBar.start()

  query.contains('time', classPlace.value)
  query.contains('stime', classWeekDay.value+'@'+classTime.value)
  await query.find().then((res) => {
    if (res.length === 0) {
      dialog.warning({
        title: '查询失败',
        content: '没有找到符合条件的课程，可能是未录入或真的没有',
        negativeText: '我知道了'
      })
    } else {
      countResult.value = res.length
      for (let i = 0; i < res.length; i++) {
        result.value.push(res[i].attributes)
      }
    }
    loadingBar.finish()
    isLoading.value = false
  }).catch((err) => {
    message.error('查询失败，请打开控制台查看错误信息')
    loadingBar.error()
    isLoading.value = false
  })
}

onUpdated(() => {
  let footer = document.querySelector('footer')
  footer.classList.remove('fixed', 'bottom-0', 'left-0', 'right-0')
  if (document.body.clientHeight < window.innerHeight) {
    footer.classList.add('fixed', 'bottom-0', 'left-0', 'right-0')
  }
})
</script>

<template>
  <div class="flex flex-col mx-6 my-10">
    <div class="flex flex-row justify-center items-center text-slate-900 dark:text-slate-100 text-lg my-2">
      <span>星期：</span>
      <span class="flex-1"><n-input-number v-model:value="classWeekDay" :min="1" :max="7" placeholder="1~7间的数字" /></span>
    </div>
    <div class="flex flex-row justify-center items-center text-slate-900 dark:text-slate-100 text-lg my-2">
      <span>时间：</span>
      <span class="flex-1"><n-input-number v-model:value="classTime" :min="1" :max="12" placeholder="1~12间的数字" /></span>
    </div>
    <div class="flex justify-center">
      <n-checkbox v-model:checked="isNow">使用当前时间</n-checkbox>
    </div>
    <div class="flex flex-row justify-center items-center text-slate-900 dark:text-slate-100 text-lg my-2">
      <span>地点：</span>
      <span class="flex-1"><n-input v-model:value="classPlace" type="text" placeholder="参照选课网上的格式"></n-input></span>
    </div>

    <div class="flex flex-row my-2 justify-center items-center">
      <button class="text-base bg-gradient-to-r dark:from-cyan-700 dark:to-blue-700 from-cyan-300 to-blue-300 text-slate-900 dark:text-slate-50 px-4 py-2 rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out mr-4" @click="queryClass">查询</button>
      <button class="text-base bg-orange-300 dark:bg-teal-600 text-slate-900 dark:text-slate-50 px-4 py-2 rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out" @click="router.push('/search')">高级搜索</button>
    </div>

    <div class="flex flex-row justify-center mt-6" v-if="isLoading">
      <n-spin size="large" />
    </div>

    <div class="flex flex-col justify-center items-center" v-if="result.length !== 0">
      <div class="flex flex-row justify-center items-center text-slate-900 dark:text-slate-100 text-base my-2">
        <span>查询结果：</span>
        <span class="flex-1">{{ countResult }}条</span>
      </div>

      <course-detail :course="item" v-for="item in result" :key="item.objectId"/>

    </div>

  </div>
</template>