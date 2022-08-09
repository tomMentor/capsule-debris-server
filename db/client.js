/*
 * @Author: Tom
 * @Date: 2022-07-26 15:48:41
 * @LastEditors: Please set LastEditors
 * @Description: 数据库连接
 */
const mongoose = require('mongoose')
const { MONGODB_URL, MONGODB_PATH, MONGODB_NAME } = require('./conf/conf')

const URL = `${MONGODB_URL}:${MONGODB_PATH}`
const DB_NAME = MONGODB_NAME

// 连接数据库
mongoose.connect(`${URL}/${DB_NAME}`)

const db = mongoose.connection

// 连接失败
db.on('error', console.error.bind(console, 'connection error:'))

// 连接成功
// db.once('open', () => {
//   // we're connected!
// })



module.exports = mongoose