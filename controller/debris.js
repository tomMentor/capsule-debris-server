/*
 * @Author: Tom
 * @Date: 2023-03-02 10:20:00
 * @LastEditors: Please set LastEditors
 * @Description: 
 */
const mongoose = require('../db/client')
const { timestamps } = require('./schema.options')

const DebrisSchema = mongoose.Schema({

  name: { type: String, require: true },

  url: { type: String, require: true },
  
  introduced: String,
  
  icon: String,
  
  uid: { type: String, require: true },
  
  cid: { type: String, require: true }

}, { timestamps })

const Debris = mongoose.model('debris', DebrisSchema)

module.exports = Debris