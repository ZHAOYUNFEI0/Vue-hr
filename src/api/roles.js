import request from '@/utils/request'

/**
 * 角色管理-获取所有角色列表
 * @param {*} params 传页码 和 几页
 * @returns 数据
 */
export function getRoles(params) {
  return request({
    url: '/sys/role',
    method: 'get',
    params
  })
}

/**
 * 根据id删除角色
 * @param {*} id 传入角色id
 * @returns 删除成功
 */
export function delRoles(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}

/**
 * 新增部门
 * @param {*} data 传入输入框输入的内容
 * @returns
 */
export function addRoles(data) {
  return request({
    url: '/sys/role',
    method: 'post',
    data
  })
}

/**
 * 编辑更新角色信息
 * @param {*} data id 输入框输入的内容
 * @returns
 */
export function updateRole(data) {
  return request({
    url: `/sys/role/${data.id}`,
    method: 'put',
    data
  })
}

/**
 *  获取角色的权限点
 * @param {*} id
 * @returns
 */
export function getRolesDetailById(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'get'
  })
}

/**
 * 设置角色权限点
 * @param {*} data
 * @returns
 */
export function assignPerm(data) {
  return request({
    url: 'sys/role/assignPrem',
    method: 'put',
    data
  })
}
