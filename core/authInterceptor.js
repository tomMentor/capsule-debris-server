/*
 * @Author: Tom
 * @Date: 2023-02-24 11:14:44
 * @LastEditors: Please set LastEditors
 * @Description: 权限拦截器
 */
const TOKEN = require('../utils/token')
const { ErrorModel } = require('../model/resModel')
const { tokenwhitelist } = require('../config/token')

function whitelistFilter(req) {

  return new Promise((reslove, reject) => {

    if (tokenwhitelist.includes(req.path)) {

      reject()

    } else {

      reslove()

    }

  })
}

function authorization(req) {
  
  return new Promise((reslove, reject) => {

    const authorization = req.headers['authorization']

    if (authorization) {

      const token = authorization.split('Bearer ')[1]

      reslove(token)

    } else {

      reject()

    }
   
  })
}


function authInterceptor(req, res, next) {

  whitelistFilter(req).then(() => authorization(req).then((token) => {

    TOKEN.get(token).then((tokenInfo) => {

      req.data = tokenInfo._doc
      next()

    }).catch(() => {
      res.status(401).json(new ErrorModel('token过期！!'))
    })

  }).catch(() => {
    // Token for null
    res.status(401).json(new ErrorModel('Token for null！'))
    
  })).catch(() => {

    next()

  })

}

module.exports = authInterceptor