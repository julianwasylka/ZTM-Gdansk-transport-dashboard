import './assets/main.css'
import 'vue-good-table-next/dist/vue-good-table-next.css'
import { vColorDelay } from './directives/vColorDelay'
import { MyLogger } from './plugins/logger'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(MyLogger)
app.directive('color-delay', vColorDelay)

app.mount('#app')