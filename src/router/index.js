// 引入Vue框架
import Vue from 'vue'
// 引入vue-router路由依赖
import Router from 'vue-router'

import PageOne from '../components/PageOne.vue'
import PageTwo from '../components/PageTwo.vue'
import PageThree from '../components/PageThree.vue'
import PageFour from '../components/PageFour.vue'
import Index from '../components/Index.vue'
import UserInfo from '../components/UserInfo'
// Vue全局使用router
Vue.use(Router)

// 定义路由配置
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: '导航一',
      component: Index,
      redirect: '/pageOne',
      children: [
        {
          path: '/pageOne',
          name: '页面一',
          component: PageOne
        },
        {
          path: '/pageTwo',
          name: '页面二',
          component: PageTwo
        },
        {
          path: '/pageThree',
          name: '页面三',
          component: PageThree
        },
        {
          path: '/pageFour',
          name: '页面四',
          component: PageFour
        },
        {
          path: '/UserInfo',
          name: '用户信息',
          component: UserInfo
        }
      ]
    }

  ]

})
