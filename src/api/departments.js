import request from '@/utils/request'

/**
 * 获取用户信息
 * @returns 用户信息
 */
export function getDepartments() {
  return request({
    method: 'get',
    url: '/company/department'

  })
}

/**
 * 根据id删除部门
 * @param 传入id
 * @returns 删除成功
 */
export function del(id) {
  return request({
    method: 'delete',
    url: `/company/department/${id}`
  })
}

/**
 * 新增部门
 * @param 用户输入的信息
 * @returns 是否添加成功
 */
export function addDepartments(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}

/**
 *  编辑部门数据回填
 * @param {*} id 部门id
 * @returns 返回部门详情回填
 */
export function getDepartDetatail(id) {
  return request({
    url: `/company/department/${id}`
  })
}

/**
 * 更新部门数据
 * @param {*} data 填写数据发送
 * @returns
 */
export function updateDepartments(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'put',
    data
  })
}
