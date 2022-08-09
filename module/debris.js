/*
 * @Author: Tom
 * @Date: 2022-08-02 11:05:23
 * @LastEditors: Please set LastEditors
 * @Description: 
 */
const mongoose = require('../db/client')
const ObjectId = mongoose.Types.ObjectId
const Debris = mongoose.Schema({
  
  _id: { type: ObjectId, default: ObjectId },
  path: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  userid: { type: String, required: true },
  category: { type: String }

}, { timestamps: {
  createdAt: 'createDate',
  updatedAt: 'updateDate'
} })

const debris = mongoose.model('debris', Debris)
module.exports = debris