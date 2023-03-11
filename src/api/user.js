import request from '@/utils/request'

/**
 * 登录请求
 * @param {data}  传入数据
 * @returns .then对象
 */
export function login(data) {
  return request({
    method: 'post',
    url: '/sys/login',
    data

  })
}

/**
 * 获取用户信息
 * @returns 返回用户信息
 */
export function getUser() {
  return request({
    method: 'post',
    url: '/sys/profile'
  })
}

export function logout() {
  return request({

  })
}
