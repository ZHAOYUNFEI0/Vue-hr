/**
 * 校验规则 专用文件
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/** 手机号正则校验
 * @param {string} 手机号
 * @returns {Boolean} 手机号校验结果
 */
export function validMobile(str) {
  return /^1[3-9]\d{9}$/.test(str)
}
