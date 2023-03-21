import router from './router'
import store from './store'

import settings from '@/settings'

// 加载动画
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 定义白名单
const whiteList = ['/login', '/404']
// 全局导航守卫，权限控制
/**
 * 参数1：到哪去
 * 参数2：从哪来
 * 参数3：是否方向的回调函数
 */
router.beforeEach(async(to, from, next) => {
  NProgress.start() // 启动动画
  const token = store.state.user.token
  const userId = store.getters.userId
  if (token) {
    // 没有用户数据 发送请求
    if (!userId) {
      await store.dispatch('user/getUser')
    }

    if (to.path === '/login') {
      next('/')
      NProgress.done()
    } else {
      next()
    }
  } else {
    if (whiteList.includes(to.path)) { // includes 该数组中是否包含该内容
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

// 后置守卫
router.afterEach((to, from) => {
  // console.log(to, from)
  document.title = settings.title + '-' + to.meta.title
  NProgress.done()
})
