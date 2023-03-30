/*
 * @Author: Tom
 * @Date: 2023-02-22 11:28:40
 * @LastEditors: Please set LastEditors
 * @Description: 
 */
const mongoose = require('../db/client')
const ObjectID = require('mongodb').ObjectId
const CategorySchema = mongoose.Schema({

  userId: {
    type: ObjectID,
    require: true
  },
  // _id: ObjectID,
  name: {
    type: String,
    require: true
  },
  createdAt: Number,
  updatedAt: Number,


}, {

  timestamps: {
    type: Number,
    currentTime: () => Math.floor(Date.now() / 1000)
  }

})

const Category = mongoose.model('category', CategorySchema)
module.exports = Category