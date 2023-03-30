/*
 * @Author: Tom
 * @Date: 2023-02-15 14:45:19
 * @LastEditors: Please set LastEditors
 * @Description: 
 */
const mongoose = require('../db/client')

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true
  },
  password: String,
  realname: String,
  createdAt: Number,
  updatedAt: Number,
  

}, {

  timestamps: {
    type: Number,
    currentTime: () => Math.floor(Date.now() / 1000)
  }

})

const User = mongoose.model('user', UserSchema)
module.exports = User

