/*
 * @Author: Tom
 * @Date: 2022-07-22 10:28:30
 * @LastEditors: Please set LastEditors
 * @Description: GET/POST
 */
const router = require('../../controller')
async function get(req, res) {
  const path = `${req.method} ${req.path}`
  const request = router[path]
  return request && await request(req, res)
}

async function post(req, res) {
  const path = `${req.method} ${req.path}`
  const request = router[path]
  return request && await request(req, res)
}

module.exports = { GET: get, POST: post }