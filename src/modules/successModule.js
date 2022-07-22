/*
 * @Author: Tom
 * @Date: 2022-07-21 23:28:45
 * @LastEditors: Please set LastEditors
 * @Description: 成功模型
 */
const BaseModule = require('./baseModule')
class SuccessModule extends BaseModule {
  constructor(data, msg) {
    super(data, msg)
    this.data = data
    this.code = 200
  }
}

module.exports = SuccessModule