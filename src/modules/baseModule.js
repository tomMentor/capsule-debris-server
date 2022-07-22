/*
 * @Author: Tom
 * @Date: 2022-07-21 23:20:22
 * @LastEditors: Please set LastEditors
 * @Description: 基础模型
 */
class BaseModule {
  constructor(data, msg) {
    this.code = null
    this.data = null
    this.msg = msg

    if (typeof data === 'string') {
      this.data = data
      return 
    }

    if (data) {
      this.data = data
      return 
    }
  }
}

module.exports = BaseModule