/*
 * @Author: Tom
 * @Date: 2022-07-26 14:27:41
 * @LastEditors: Please set LastEditors
 * @Description: 
 */
const category = require('./category')
const debris = require('./debris')
const common = require('./common')
const user = require('./user')
const test = require('./test')

module.exports = {
  ...category,
  ...debris,
  ...common,
  ...user,
  ...test
}