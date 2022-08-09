/*
 * @Author: Tom
 * @Date: 2022-07-27 21:25:20
 * @LastEditors: Please set LastEditors
 * @Description: 
 */
const mongoose = require('../db/client')
const ObjectID = require('mongoose').Types.ObjectId

const UserSchema = mongoose.Schema({

  userName: { type: String, required: true },

  passWord: { type: String, required: true },

  userId: { type: ObjectID, default: ObjectID }

}, { timestamps: {
  createdAt: 'createDate',
  updatedAt: 'updateDate'
} })

const User = mongoose.model('user', UserSchema)

module.exports = User