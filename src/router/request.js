/*
 * @Author: Tom
 * @Date: 2022-07-22 10:28:30
 * @LastEditors: Please set LastEditors
 * @Description: GET/POST
 */
const router = require('../controller/index')
function get(req, res) {
  const path = `${req.method} ${req.path}`
  const request = router[path]
  return request && request(req)
}

function post(req, res) {
  const path = `${req.method} ${req.path}`
  const request = router[path]
  return request && request(req)
}

module.exports = { GET: get, POST: post }