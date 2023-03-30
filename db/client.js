/*
 * @Author: Tom
 * @Date: 2022-09-08 14:23:45
 * @LastEditors: 
 * @Description: Connect mongoodb
 */
const mongoose = require('mongoose')
const { MONGODB_URL, MONGODB_PATH, MONGODB_NAME } = require('./conf/conf')

const URL = `${MONGODB_URL}:${MONGODB_PATH}`
const DB_NAME = MONGODB_NAME

const PATH = `${URL}/${DB_NAME}`

// Connect mongoodb
mongoose.connect(PATH)

const db = mongoose.connection

// Connection error
db.on('error', console.error.bind(console, 'connection error:'))

module.exports = mongoose