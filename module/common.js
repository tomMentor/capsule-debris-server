/*
 * @Author: Tom
 * @Date: 2022-08-01 14:45:33
 * @LastEditors: Please set LastEditors
 * @Description: 
 */
const mongoose = require('../db/client')
const ObjectId = require('mongoose').Types.ObjectId


const Common = mongoose.Schema({
  _id: {
    type: ObjectId,
    default: ObjectId
  },
  path: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  userid: { type: String, required: true },
  category: { type: String }

}, { timestamps: {
  createdAt: 'createDate',
  updatedAt: 'updateDate'
}})

const common = mongoose.model('common', Common)

module.exports = common