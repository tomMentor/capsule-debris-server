/*
 * @Author: Tom
 * @Date: 2022-07-26 14:27:41
 * @LastEditors: 
 * @Description: 
 */
const category = require('./category')
const debris = require('./debris')
const common = require('./common')

module.exports = {
  ...category,
  ...debris,
  ...common
}