import router from './router'
import store from './store'

import settings from '@/settings'

// 加载动画
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { asyncRoutes } from '@/router'
// import { constantRoutes } from '@/router'
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
      const menus = await store.dispatch('user/getUser')
      const filterRouters = asyncRoutes.filter(item => {
        const routeName = item.children[0].name
        // console.log(routeName)
        return menus.includes(routeName)
      })
      // console.log(menus)
      // const menus = store.user.state.menus
      // console.log(store.state.user.menus)
      // console.log(filterRouters)
      router.addRoutes([...filterRouters, { path: '*', redirect: '/404', hidden: true }])
      store.commit('menu/setMenuList', filterRouters)
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
