import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import AV from 'leancloud-storage'
import App from './App.vue'
import router from './router'

AV.init({
  appId: '4WV1Ync0DfajvkUqBMzgJJhx-MdYXbMMI',
  appKey: 'qTM25GrNwHm5FQNABNfttPOC',
  serverURL: 'https://api2.wjsphy.top',
})

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
