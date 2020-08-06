// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from '../node_modules/axios'
import router from './router' /* 引入一个路由变量 */
// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'bootstrap'
import 'jquery/dist/jquery.min'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import apiUrl from '@/components/Global.vue'
import qs from 'qs'

// Vue全局对象可用
Vue.prototype.$qs = qs
Vue.prototype.apiUrl = apiUrl.apiUrl
Vue.use(ElementUI)
Vue.prototype.$ajax = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router, /* 创建根实例时使用了路由变量 */
  components: { App },
  template: '<App/>'
})
