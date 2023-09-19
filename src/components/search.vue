<script setup>
import { ref, onMounted, onUpdated, onBeforeUnmount } from 'vue'
import { NInput, NSelect, useDialog, useMessage, useLoadingBar, NSpin } from 'naive-ui'
import AV from 'leancloud-storage'
import courseDetail from './courseDetail.vue'

let isInputOpen = ref(true)
let isLoading = ref(false)
let classInfo = ref({
  className: null,
  classTime: null,
  classWeekDay: null,
  classPlace: null,
  classTeacher: null,
})
let classCategory = ref(null)
let classSchool = ref(null)
let tskCategory = ref(null)
let engCategory = ref(null)
let message = useMessage()
let loadingBar = useLoadingBar()
let dialog = useDialog()
let countResult = ref(0)
let result = ref([])
let query = null

const inputInfo = [
  {
    title: '名称',
    placeholder: '课程名称（支持子串）',
    model: 'className',
  },
  {
    title: '教师',
    placeholder: '教师姓名',
    model: 'classTeacher',
  },
  {
    title: '地点',
    placeholder: '课程地点',
    model: 'classPlace',
  },
  {
    title: '时间',
    placeholder: '1-12间的数字',
    model: 'classTime',
  },
  {
    title: '星期',
    placeholder: '1-7间的数字',
    model: 'classWeekDay',
  }
]
const options = [
  { label: '全部', value: null },
  { label: '专业课', value: '专业课' },
  { label: '政治课', value: '政治课'},
  { label: '公选课', value: '公选课' },
  { label: '通识课', value: '通识课' },
  { label: '体育课', value: '体育课' },
  { label: '英语课', value: '英语课' },
  { label: '计算机课程', value: '计算机课程' },
]
const options2 = [
  { label: '全部', value: null },
  { label: '数学科学学院', value: '数学科学学院' },
  { label: '物理学院', value: '物理学院' },
  { label: '化学与分子工程学院', value: '化学与分子工程学院' },
  { label: '生命科学学院', value: '生命科学学院' },
  { label: '地球与空间科学学院', value: '地球与空间科学学院' },
  { label: '心理与认知科学学院', value: '心理与认知科学学院' },
  { label: '软件与微电子学院', value: '软件与微电子学院' },
  { label: '新闻与传播学院', value: '新闻与传播学院' },
  { label: '中国语言文学系', value: '中国语言文学系' },
  { label: '历史学系', value: '历史学系' },
  { label: '考古文博学院', value: '考古文博学院' },
  { label: '哲学系', value: '哲学系' },
  { label: '国际关系学院', value: '国际关系学院' },
  { label: '经济学院', value: '经济学院' },
  { label: '光华管理学院', value: '光华管理学院' },
  { label: '法学院', value: '法学院' },
  { label: '信息管理系', value: '信息管理系' },
  { label: '社会学系', value: '社会学系' },
  { label: '政府管理学院', value: '政府管理学院' },
  { label: '英语语言文学系', value: '英语语言文学系' },
  { label: '外国语学院', value: '外国语学院' },
  { label: '马克思主义学院', value: '马克思主义学院' },
  { label: '体育教研部', value: '体育教研部' },
  { label: '艺术学院', value: '艺术学院' },
  { label: '对外汉语教育学院', value: '对外汉语教育学院' },
  { label: '元培学院', value: '元培学院' },
  { label: '深圳研究生院', value: '深圳研究生院' },
  { label: '信息科学技术学院', value: '信息科学技术学院' },
  { label: '国家发展研究院', value: '国家发展研究院' },
  { label: '教育学院', value: '教育学院' },
  { label: '人口研究所', value: '人口研究所' },
  { label: '前沿交叉学科研究院', value: '前沿交叉学科研究院' },
  { label: '工学院', value: '工学院' },
  { label: '集成电路学院', value: '集成电路学院' },
  { label: '计算机学院', value: '计算机学院' },
  { label: '智能学院', value: '智能学院' },
  { label: '电子学院', value: '电子学院' },
  { label: '城市与环境学院', value: '城市与环境学院' },
  { label: '环境科学与工程学院', value: '环境科学与工程学院' },
  { label: '中国社会科学调查中心', value: '中国社会科学调查' },
  { label: '歌剧研究院', value: '歌剧研究院' },
  { label: '建筑与景观设计学院', value: '建筑与景观设计学院' },
  { label: '汇丰商学院', value: '汇丰商学院' },
  { label: '新媒体研究院', value: '新媒体研究院' },
  { label: '燕京学堂', value: '燕京学堂' },
  { label: '现代农学院', value: '现代农学院' },
  { label: '南南合作与发展学院', value: '南南合作与发展学院' },
  { label: '习近平新时代中国特色社会主义思想研究院', value: '习近平新时代中国特色社会主义思想研究院' },
  { label: '人工智能研究院', value: '人工智能研究院' },
  { label: '材料科学与工程学院', value: '材料科学与工程学院' },
  { label: '未来技术学院', value: '未来技术学院' },
  { label: '学生工作部人民武装部', value: '学生工作部人民武装部' },
  { label: '教务部', value: '教务部' },
  { label: '研究生院', value: '研究生院' },
  { label: '创新创业学院', value: '创新创业学院' },
  { label: '医学部', value: '医学部' },
  { label: '国际合作部', value: '国际合作部' },
]
const tskoptions = [
  { label: '全部', value: null },
  { label: 'I.人类文明及其传统', value: '课I)' },
  { label: 'II.现代社会及其问题', value: '课II)' },
  { label: 'III.艺术与人文', value: '课III)' },
  { label: 'IV.数学、自然与技术', value: '课IV)' },
]
const engoptions = [
  { label: '全部', value: null },
  { label: 'A', value: 'A' },
  { label: 'B', value: 'B' },
  { label: 'C', value: 'C' },
  { label: 'C+', value: 'C+' },
  { label: 'Y', value: 'Y' },
]

async function queryClass() {
  query = new AV.Query('course')
  if (!classInfo.value.className && !classInfo.value.classTeacher && !classInfo.value.classPlace && !classInfo.value.classTime && !classInfo.value.classWeekDay && !classCategory.value && !classSchool.value) {
    message.warning('你是猴子派来捣乱的吗？')
    return
  }
  if (classInfo.value.classTime) {
    if (classInfo.value.classTime < 1 || classInfo.value.classTime > 12) {
      message.error('时间范围为1-12')
      return
    }
  }
  if (classInfo.value.classWeekDay) {
    if (classInfo.value.classWeekDay < 1 || classInfo.value.classWeekDay > 7) {
      message.error('星期范围为1-7')
      return
    }
  }
  loadingBar.start()
  isInputOpen.value = false
  isLoading.value = true
  result.value = []
  if (classCategory.value) {
    query.equalTo('category', classCategory.value)
    if (classCategory.value === '通识课') {
      if (tskCategory.value) {
        query.contains('type', tskCategory.value)
      }
    }
    if (classCategory.value === '英语课') {
      if (engCategory.value) {
        query.equalTo('en_grade', engCategory.value)
      }
    }
  }
  if (classSchool.value) {
    query.equalTo('school', classSchool.value)
  }
  if (classInfo.value.className) {
    query.contains('name', classInfo.value.className)
  }
  if (classInfo.value.classTeacher) {
    query.contains('teacher', classInfo.value.classTeacher)
  }
  if (classInfo.value.classPlace) {
    query.contains('time', classInfo.value.classPlace)
  }
  if (classInfo.value.classTime) {
    let queryClassTime = classInfo.value.classTime.toString(16)
    if (classInfo.value.classWeekDay){
      query.contains('stime', classInfo.value.classWeekDay+'@'+queryClassTime)
    } else {
      query.contains('stime', '@'+queryClassTime)
    }
  } else {
    if (classInfo.value.classWeekDay){
      query.contains('stime', classInfo.value.classWeekDay+'@')
    }
  }
  query.ascending('name')

  await query.count().then((res) => {
    countResult.value = res
    if (countResult.value === 0) {
      dialog.warning({
        title: '查询失败',
        content: '没有找到符合条件的课程，可能是未录入或真的没有',
        negativeText: '我知道了'
      })
      loadingBar.finish()
      isLoading.value = false
      isInputOpen.value = true
      return
    }
  }).catch((err) => {
    message.error('查询失败，请打开控制台查看错误信息')
    loadingBar.error()
    isLoading.value = false
    isInputOpen.value = true
    return
  })
  await query.find().then((res) => {
    for (let i = 0; i < res.length; i++) {
      result.value.push(res[i].attributes)
    }
    loadingBar.finish()
    isLoading.value = false
  }).catch((err) => {
    message.error('查询失败，请打开控制台查看错误信息')
    loadingBar.error()
    isLoading.value = false
    isInputOpen.value = true
    return
  })
}

async function continueQuery() {
  if (result.value.length >= countResult.value) {
    message.info('已经没有更多了')
    return
  }
  loadingBar.start()
  isLoading.value = true
  await query.skip(result.value.length).find().then((res) => {
    for (let i = 0; i < res.length; i++) {
      result.value.push(res[i].attributes)
    }
    loadingBar.finish()
    isLoading.value = false
  }).catch((err) => {
    message.error('查询失败，请打开控制台查看错误信息')
    loadingBar.error()
    isLoading.value = false
    isInputOpen.value = true
    return
  })
}

onUpdated(() => {
  let footer = document.querySelector('footer')
  footer.classList.remove('fixed', 'bottom-0', 'left-0', 'right-0')
  if (document.body.clientHeight < window.innerHeight) {
    footer.classList.add('fixed', 'bottom-0', 'left-0', 'right-0')
  }
})

onBeforeUnmount(() => {
  let footer = document.querySelector('footer')
  footer.classList.add('fixed', 'bottom-0', 'left-0', 'right-0')
})
</script>
<template>
<div class="flex flex-col items-center mx-6 my-6">
  <h1 class="text-slate-700 dark:text-slate-200 font-semibold text-2xl">
    课程查询
  </h1>
  <div class="flex flex-col items-center" v-if="isInputOpen">
    <div class="w-full h-px bg-slate-200 dark:bg-slate-700 my-4"></div>
    <div class="w-full my-2">
      <n-select v-model:value="classCategory" :options="options" placeholder="课程类别（默认全部）">
      </n-select>
    </div>
    <div class="w-full my-2 flex flex-row justify-center items-center" v-if="classCategory==='通识课'">
      <span class="text-slate-800 dark:text-slate-100 text-lg">通识课：</span>
      <span class="flex-1">
        <n-select v-model:value="tskCategory" :options="tskoptions" placeholder="通识课所属类别">
        </n-select>
      </span>
    </div>
    <div class="w-full my-2 flex flex-row justify-center items-center" v-if="classCategory==='英语课'">
      <span class="text-slate-800 dark:text-slate-100 text-lg">英语课分级：</span>
      <span class="flex-1">
        <n-select v-model:value="engCategory" :options="engoptions" placeholder="大英分级">
        </n-select>
      </span>
    </div>
    <div class="w-full my-2">
      <n-select v-model:value="classSchool" :options="options2" placeholder="开课单位（默认全部）">
      </n-select>
    </div>
    <div class="flex flex-row justify-center items-center text-slate-800 dark:text-slate-100 text-lg my-2" v-for="item in inputInfo" :key="item.title">
      <span>{{ item.title }}：</span>
      <span class="flex-1"><n-input v-model:value="classInfo[item.model]" :placeholder="item.placeholder" /></span>
    </div>
    <button class="text-base bg-gradient-to-r dark:from-cyan-700 dark:to-blue-700 from-cyan-300 to-blue-300 text-slate-800 dark:text-slate-50 px-8 py-2 rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out mt-2" @click="queryClass">查询</button>
  </div>

  <div class="mt-3 text-sky-800 dark:text-sky-200 text-base cursor-pointer" v-text="isInputOpen ? '收起查询界面' : '展开查询界面'" @click="isInputOpen = !isInputOpen">
  </div>
  <div class="w-full h-px bg-slate-200 dark:bg-slate-700 my-4"></div>
  
  <div class="flex flex-col justify-center items-center" v-if="result.length !== 0">
    <div class="flex flex-row justify-center items-center text-slate-900 dark:text-slate-100 text-base my-2">
      <span>查询结果：</span>
      <span class="flex-1">{{ countResult }}条</span>
    </div>
    
    <course-detail :course="item" v-for="item in result" :key="item.objectId" :is-hide="countResult > 50 ? true : false"/>
    
    <div class="flex flex-row justify-center items-center cursor-pointer mt-3" v-if="result.length < countResult && !isLoading" @click="continueQuery">
      <span class="text-sky-700 dark:text-sky-300 text-base">
        加载更多
      </span>
    </div>
  </div>

  <div class="flex flex-row justify-center items-center mt-6 mx-6" v-if="isLoading">
    <n-spin size="large" />
    <div class="text-slate-900 dark:text-slate-100 my-2 ml-4">
      查询条件较多时可能需要较长时间，请耐心等待...
    </div>
  </div>
</div>
</template>