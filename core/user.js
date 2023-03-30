/*
 * @Author: Tom
 * @Date: 2023-02-22 10:03:31
 * @LastEditors: Please set LastEditors
 * @Description: 用户核心
 */
const User = require('../controller/user')
const { getPassword  } = require('../utils/crypto')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const token = require('../utils/token')

/**
 * @description: 用户注册
 * @param {*} req
 * @param {*} res
 * @return {*}
 */
async function registered(req, res) {

  const { username } = req.body
  const password = getPassword(req.body.password)

  const userName = await User.find({ username })

  if (userName.length > 0) return res.json(new ErrorModel('用户已注册！'))

  const createUser = await User.create({ username, password})
  if (createUser) return res.json(new SuccessModel('注册成功。')) 

  return res.json(new ErrorModel('注册失败'))

}

/**
 * @description: 用户登陆
 * @param {*} req
 * @param {*} res
 * @return {*}
 */
async function login(req, res) {

  const { username } = req.body
  const password = getPassword(req.body.password)

  const login = await User.findOne({ username, password })

  if (login) return res.json(
    new SuccessModel({
      message: '登录成功。', 
      data: await token.set(login),
    })
  ) 
  
  return res.json(new ErrorModel('用户名或密码错误！'))

}

/**
 * @description: 修改密码
 * @param {*} req
 * @param {*} res
 * @return {*}
 */
async function updatePassword(req, res) {

  const { username, password, curpassword } = req.body
  const encryptionpassword = getPassword(req.body.password)
  const encryptioncurpassword = getPassword(req.body.curpassword)

  if (password === curpassword) return res.json(new ErrorModel('旧密码与新密码不能重复。'))

  const userc = await User.findOneAndUpdate(
    { username, password: encryptioncurpassword }, // 条件
    { password: encryptionpassword }  
  )

  if (!userc) return res.json(new ErrorModel('密码修改失败！'))
  
  return res.json(new SuccessModel('密码修改成功！')) 

}

module.exports = { registered, login, updatePassword }