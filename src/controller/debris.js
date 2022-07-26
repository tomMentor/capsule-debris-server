/*
 * @Author: Tom
 * @Date: 2022-07-26 14:33:39
 * @LastEditors: Please set LastEditors
 * @Description: 
 */

function list() {
  return []
}

function create() {
  return {}
}

function update() {
  return {}
}

function remove() {
  return '删除成功'
}

module.exports = {
  'GET /api/debris/list': list,
  'POST /api/debris/create': create,
  'POST /api/debris/update': update,
  'POST /api/debris/remove': remove,
}