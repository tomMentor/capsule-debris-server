/*
 * @Author: Tom
 * @Date: 2022-07-27 21:34:49
 * @LastEditors: Please set LastEditors
 * @Description: 
 */

const User = require('../module/user')
const redis = require('../db/redis')
const xss = require('xss')
const { cookieExpires } = require('../src/tool/util')

async function userLogin(req, res) {
  return new Promise(async (reslove, reject) => {

    // 使用用户名与密码登录
    try {

      // 验证用户是否存在
      const oneUser = await User.find({ userName: req.body.userName })
      console.log(req.body)
      if ((oneUser && oneUser.length > 0)) {
        const user = await User.where(req.body).catch(err => {
          reslove({ data: err.error, msg: '登陆失败' })
          return
        })

        if (user && user.length > 0) {
          reslove({ data: user, msg: '登陆成功' })
          res.setHeader('Set-Cookie', `userid=${user[0].userId}; path=/; httpOnly; expires=${cookieExpires()}`)
          // req.session.username = User.userName
          req.session.username = User.userName
          redis.set(req.sessionId, user[0])
          return
        } else {
          reslove({ data: null, msg: '用户名或密码错误' })
          return
        }
        
      } else {

          User.create(req.body).then(data => {
            req.session.username = data.userName
            redis.set(data.userId.toString(), data)
            res.setHeader('Set-Cookie', `userid=${data.userId}; path=/; httpOnly; expires=${cookieExpires()}`)
            reslove({code: 0,  data, msg: '添加成功'})
            

          }).catch(err => {
            for (var attr in err.errors) {
              reslove({code: -1,  data: null, msg: err.errors[attr].message})
              return
            }
            reslove({code: -1,  data: null, msg: 'err.errors[attr].message'})
          })
      }

      
    } catch (error) {
      console.log(error)
    }

  })
  
}
module.exports = {
  'POST /api/user/login': userLogin,
}