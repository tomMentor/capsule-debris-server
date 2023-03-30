/*
 * @Author: Tom
 * @Date: 2022-09-08 11:09:35
 * @LastEditors: Please set LastEditors
 * @Description: 用户路由
 */
const express = require('express')
const router = express.Router()
const User = require('../core/user')

// 注册
router.post('/registered', User.registered)

// 登陆
router.post('/login', User.login)

// 修改密码
router.post('/update/password', User.updatePassword)

module.exports = router;
