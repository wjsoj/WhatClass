import './assets/main.css'

import { createApp } from 'vue'
import AV from 'leancloud-storage'
import App from './App.vue'
import router from './router'

AV.init({
  appId: import.meta.env.VITE_APP_ID,
  appKey: import.meta.env.VITE_APP_KEY,
  serverURL: 'https://api2.wjsphy.top',
})

const app = createApp(App)

app.use(router)

app.mount('#app')
