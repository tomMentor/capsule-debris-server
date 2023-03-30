/*
 * @Author: Tom
 * @Date: 2023-02-15 14:49:23
 * @LastEditors: 
 * @Description: 密码加密
 */
const crypto = require('crypto')

const SECRET_KEY = 'WJiol#213123_'

// md5 加密
function md5(content) {
  let md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex')
}

// 加密函数
function getPassword(password) {
  const str = `password=${password}&key=${SECRET_KEY}`
  return md5(str)
}

module.exports = {
  getPassword
}