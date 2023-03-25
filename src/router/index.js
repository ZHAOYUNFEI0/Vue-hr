import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

import departments from '@/router/modules/departments'
import employees from '@/router/modules/employees'
import settings from '@/router/modules/settings'
import salarys from '@/router/modules/salarys'
import social_securitys from '@/router/modules/social_securitys'
import attendances from '@/router/modules/attendances'
import approvals from '@/router/modules/approvals'
import permissions from '@/router/modules/permissions'

// 动态路由表
export const asyncRoutes = [
  departments,
  settings,
  employees,
  permissions,
  salarys,
  social_securitys,
  attendances,
  approvals
]

// 静态路由表
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  {
    path: '/employees/import',
    component: Layout,
    children: [{
      path: '',
      name: 'Import',
      component: () => import('@/views/employees/empImport.vue'),
      meta: { title: 'Excel导入', icon: 'people' },
      hidden: true
    }]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

// 合并静态路由表和动态路由表
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: [...constantRoutes, ...asyncRoutes]
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
