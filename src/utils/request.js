import axios from 'axios'
import store from '@/store'
import router from '@/router'

const service = axios.create({
  // 基地址
  // baseURL: '/api',
  baseURL: process.env.VUE_APP_BASE_API,

  // 请求超时等待
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(function(config) {
  // 在发送请求之前做些什么
  const token = store.state.user.token
  if (token) {
    config.headers.Authorization = 'Bearer ' + token
  }
  return config
}, function(error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(function(response) {
  // 对响应数据做点什么
  if (response.data.success) {
    return response
  } else {
    return Promise.reject(new Error(response.data.message))
  }
}, function(error) {
  // console.dir(error)
  if (error.response.data.code === 10002) {
    // 清除token 清除用户信息
    store.commit('user/removeToken')
    store.commit('user/removeUser')
    // 跳转到登录页面
    router.push({
      path: '/login',
      query: {
        return_url: router.currentRoute.fullPath
      }
    })
  }
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default service
