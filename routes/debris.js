/*
 * @Author: Tom
 * @Date: 2023-03-02 10:52:08
 * @LastEditors: Please set LastEditors
 * @Description: 
 */
const express = require('express')
const router = express()
const Debris = require('../core/debris')

router.post('/create', Debris.create)

router.post('/remove', Debris.remove)

router.post('/update', Debris.update)

router.get('/list', Debris.list)

module.exports = router