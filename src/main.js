import { createApp } from 'vue'
// Bootstrap
import 'bootstrap'

// material-icons
import 'material-icons/iconfont/material-icons.css'

// emitter
import emitter from '@/methods/emitter'

// CKEditor
import CKEditor from '@ckeditor/ckeditor5-vue'

// PageLoading
import Loading from '@/components/PageLoading.vue'

// axios / VueAxios
import axios from 'axios'
import VueAxios from 'vue-axios'

import App from './App.vue'
import router from './router'

const app = createApp(App)
// 全域註冊
app.config.globalProperties.$emitter = emitter

app.use(VueAxios, axios)
app.use(CKEditor)
app.use(router)
app.component('Loading', Loading)
app.mount('#app')
