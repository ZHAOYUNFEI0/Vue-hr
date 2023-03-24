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

/**
 * 根据id删除员工管理 员工
 * @param {*} id 传入id
 * @returns
 */
export function delEmployess(id) {
  return request({
    url: '/sys/user/' + id,
    method: 'delete'
  })
}

/**
 * 员工管理-新增员工
 * @param {*} data 传入员工信息
 * @returns
 */
export function addEmployee(data) {
  return request({
    url: '/sys/user',
    method: 'post',
    data
  })
}
