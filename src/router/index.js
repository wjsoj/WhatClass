import { createRouter, createWebHistory } from 'vue-router'
import mainTable from '../components/mainTable.vue'

let routes = [
  {
    path: '/',
    name: 'home',
    component: mainTable
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../components/search.vue')
  }
]

// 创建路由
const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return { top: 0 }
      }
    },
})

export default router