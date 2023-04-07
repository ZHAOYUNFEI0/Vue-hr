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
export function getUsers() {
  return request({
    method: 'post',
    url: '/sys/profile'
  })
}

/**
 * 获取用户基本信息
 * @returns 用户信息
 */
export function getUserInfo(id) {
  return request({
    method: 'get',
    url: '/sys/user/' + id
  })
}

export function logout() {
  return request({

  })
}

/**
 *  员工管理-查看：根据id显示详情数据集
 * @param {*} id 传入点击用户id
 * @returns 返回用户基本信息
 */
export function getUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'get'
  })
}

