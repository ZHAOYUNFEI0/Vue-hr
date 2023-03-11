import axios from 'axios'
import store from '@/store'

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
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default service
