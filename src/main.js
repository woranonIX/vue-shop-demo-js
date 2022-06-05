import { createApp } from 'vue'
import App from './App.vue'
import { MotionPlugin } from '@vueuse/motion'
import router from './router.js'

createApp(App)
.use(MotionPlugin)
.use(router)
.mount('#app')
