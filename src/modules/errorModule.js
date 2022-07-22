/*
 * @Author: Tom
 * @Date: 2022-07-21 23:22:35
 * @LastEditors: Please set LastEditors
 * @Description: 错误模型
 */
const BaseModule = require('./baseModule')

class ErrorModule extends BaseModule {
  constructor(msg) {
    super(msg)
    this.code = -1
    this.msg = msg
    this.data = null
  }
}

module.exports = ErrorModule