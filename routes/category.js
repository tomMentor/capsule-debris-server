/*
 * @Author: Tom
 * @Date: 2023-02-22 11:27:35
 * @LastEditors: Please set LastEditors
 * @Description: 分类
 */
const express = require('express')
const router = express.Router()
const Category = require('../core/category')

// 创建
router.post('/create', Category.create)

// 删除
router.post('/remove', Category.remove)

// 更新
router.post('/update', Category.update)

// 查询
router.get('/list', Category.list)

module.exports = router