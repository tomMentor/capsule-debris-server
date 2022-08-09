/*
 * @Author: Tom
 * @Date: 2022-08-01 16:51:22
 * @LastEditors: Please set LastEditors
 * @Description: 
 */
const mongoose = require('../db/client')
const ObjectId = require('mongoose').Types.ObjectId
const Category = mongoose.Schema({
  _id: { type: ObjectId, default: ObjectId },
  userid: { type: String, required: true },
  name: { type: String, required: true },
  author: { type: String, required: true }
}, { timestamps: {
  createdAt: 'createDate',
  updatedAt: 'updateDate'
} })

const category = mongoose.model('categorie', Category)

module.exports = category