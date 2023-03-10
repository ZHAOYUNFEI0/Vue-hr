import axios from 'axios'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,

  // 请求超时等待
  timeout: 5000

})

export default service
