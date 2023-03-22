import request from '@/utils/request'

/**
 * 获取员工简单列表
 * @returns 员工简单列表
 */
export function getEmployessSimple() {
  return request({
    url: '/sys/user/simple',
    method: 'get'
  })
}

export function getEmployess(params) {
  return request({
    url: '/sys/user',
    method: 'get',
    params
  })
}
