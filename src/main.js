import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // 权限控制

// 导入组件
import PageTools from '@/components/PageTools'
// 注册全局组件
Vue.component(PageTools.name, PageTools)

// set ElementUI lang to EN
Vue.use(ElementUI)
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

// 自定义指令
Vue.directive('allow', {
  inserted(el, binding) {
    const a = store.state.user.getUser.roles.points
    if (!a.includes(binding.value)) {
      // console.log(el)
      el.style.display = 'none'
    }
    // console.log(binding.value)
  }
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
