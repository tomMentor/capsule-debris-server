/*
 * @Author: Tom
 * @Date: 2022-09-08 14:35:04
 * @LastEditors: Please set LastEditors
 * @Description: User model
 */
const mongoose = require('../db/client')
const ObjectID = require('mongoose').Types.ObjectId

const create = mongoose.Schema({

  name: { require: true, type: String }

})

const update = mongoose.Schema({

  name: { require: true, type: String },

  _id: { require: true, type: ObjectID }

})

const remove = mongoose.Schema({
  _id: { require: true, type: ObjectID }
})

const Create = mongoose.model('user', create)

const Update = mongoose.model('user', update)

const Remove = mongoose.model('user', remove)

module.exports = {
  Create,
  Update,
  Remove
}