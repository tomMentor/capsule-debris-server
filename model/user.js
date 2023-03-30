/*
 * @Author: Tom
 * @Date: 2022-09-08 14:35:04
 * @LastEditors: Please set LastEditors
 * @Description: User model
 */
const mongoose = require('../db/client')
const ObjectID = require('mongoose').Types.ObjectId
const { timestamps } = require('./schemaOption')

const user = mongoose.Schema(
  {
    userName: { require: true, type: String },
    passWord: { require: true, type: String },
    userId: { type: ObjectID, default: ObjectID }
  }, 
  { timestamps })

const User = mongoose.model('user', user)

module.exports = User