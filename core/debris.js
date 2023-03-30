/*
 * @Author: Tom
 * @Date: 2023-03-02 10:52:08
 * @LastEditors: Please set LastEditors
 * @Description: 
 */
const Debris = require('../controller/debris')
const { SuccessModel, ErrorModel } = require('../model/resModel')

async function create(req, res) {

  const { _id: uid } = req.data
  const { cid, name, introduced, icon, url } = req.body

  const debris = await Debris.find({ name })
  if (debris.length > 0) return res.json(new ErrorModel('分类已存在！'))

  Debris.create({ uid, cid, name, introduced, icon, url }).then((data) => {
    res.json(new SuccessModel({
      message: '创建成功',
      data
    }))
  }).catch((error) => {
    res.json(new ErrorModel({
      message: '创建失败',
      data: error
    }))
  })

}

async function remove(req, res) {

  const { _id: uid } = req.data
  const { id: _id } = req.body

  Debris.findOneAndRemove({ _id, uid }, { new: true }).then(() => {
    res.json(new SuccessModel('删除成功'))
  }).catch(() => {
    res.json(new ErrorModel('删除成功'))
  })

}

async function update(req, res) {

  const { _id: uid } = req.data
  const { id: _id, name, url, icon, introduced } = req.body

  Debris.findOneAndUpdate({ _id, uid }, {
    name, url, icon, introduced
  }).then(() => {
    res.json(new SuccessModel('修改成功'))
  }).catch(() => {
    res.json(new ErrorModel('修改成功'))
  })

}


async function list(req, res) {
  
  const { _id: uid } = req.data

  const list = await Debris.find({ uid })

  res.json(new SuccessModel({ message: '查询成功', data: list || [] }))

}

module.exports = { create, remove, update, list }