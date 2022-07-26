/*
 * @Author: Tom
 * @Date: 2022-07-26 14:33:39
 * @LastEditors: Please set LastEditors
 * @Description: 
 */

function list() {
  return []
}

function create(req) {
  return req.body || {}
}

function update(req) {
  return req.body || {}
}

function remove() {
  return '删除成功'
}

module.exports = {
  'GET /api/common/list': list,
  'POST /api/common/create': create,
  'POST /api/common/update': update,
  'POST /api/common/remove': remove,
}