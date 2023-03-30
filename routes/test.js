/*
 * @Author: Tom
 * @Date: 2023-03-17 10:33:19
 * @LastEditors: Please set LastEditors
 * @Description: 
 */
const express = require('express')
const router = express.Router()
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.get('/check/channel', (req, res) => {
  res.json(new SuccessModel('通道建立成功！'))
})

module.exports = router
