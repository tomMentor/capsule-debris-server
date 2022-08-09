/*
 * @Author: Tom
 * @Date: 2022-08-02 14:20:49
 * @LastEditors: Please set LastEditors
 * @Description: 
 */
const { cookieExpires } = require('../src/tool/util')
module.exports = {
  'GET /api/test': (req, res) => {
    return { data: req.cookie }
  },
  'GET /api/test/login': (req, res) => {
    res.setHeader('Set-Cookie', `userid=${req.query.name}; path=/; httpOnly; expires=${cookieExpires()}`)
    return { data: req.cookie }
  }
} 