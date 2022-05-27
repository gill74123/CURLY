import { createApp } from 'vue'

// material-icons
import 'material-icons/iconfont/material-icons.css'

// axios / VueAxios
import axios from 'axios'
import VueAxios from 'vue-axios'

// emitter
import emitter from '@/methods/emitter'

// CKEditor
import CKEditor from '@ckeditor/ckeditor5-vue'

// PageLoading
import Loading from '@/components/PageLoading.vue'

// AOS
import AOS from 'aos'
import 'aos/dist/aos.css'

// ToastMessages, httpMessageState
import ToastMessages from '@/components/ToastMessages.vue'
import httpMessageState from '@/methods/pushMessageState'

// vee-validate
import { Form, Field, ErrorMessage, defineRule, configure } from 'vee-validate'
import AllRules from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'

import App from './App.vue'
import router from './router'

// vee-validate 設定
configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true // 當輸入任何內容直接進行驗證
})
setLocale('zh_TW') // 設定預設語系
// 規則設定
Object.keys(AllRules).forEach(rule => {
  defineRule(rule, AllRules[rule])
})

const app = createApp(App)
// 全域註冊
app.config.globalProperties.$emitter = emitter
app.config.globalProperties.$httpMessageState = httpMessageState

app.use({
  install: () => {
    AOS.init({
      disable: false,
      // startEvent: 'load',
      // initClassName: 'aos-init',
      // animatedClassName: 'aos-animate',
      // useClassNames: false,
      // disableMutationObserver: false,
      // debounceDelay: 50,
      // throttleDelay: 99,
      offset: 200,
      // delay: 1000,
      duration: 1000,
      easing: 'ease',
      once: false,
      mirror: false
      // anchorPlacement: 'top-bottom'
    })
  }
})
app.use(VueAxios, axios)
app.use(CKEditor)
app.use(router)
app.component('ToastMessages', ToastMessages)
app.component('Loading', Loading)
app.component('Form', Form)
app.component('Field', Field)
app.component('ErrorMessage', ErrorMessage)
app.mount('#app')
