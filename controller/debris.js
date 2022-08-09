/*
 * @Author: Tom
 * @Date: 2022-07-26 14:33:39
 * @LastEditors: Please set LastEditors
 * @Description: 
 */
const Debris = require('../module/debris')
const ObjectId = require('mongoose').Types.ObjectId
const redis = require('../db/redis')

async function list(req) {
  const { userid } = req.cookie
  const { userName } = req.cookie
  return Debris.find({ ...req.body || {}, userid }).then(res => {
    return { data: res, msg: '查询成功' }
  })
}

async function create(req) {
  const { userid } = req.cookie
  const userData = await redis.get(userid)
  const data = { ...req.body,  author: userData['userName'], userid }
  try {
    return Debris.create(data).then(res => {
      return { data: res, msg: '添加成功' }
    }).catch(err => {
      for (var attr in err.errors) {
        return {code: -1,  data: null, msg: err.errors[attr].message}
      }
    })
  } catch (error) {
    return {  data: error, msg: '失败'}
  }
}

async function update(req) {
  const { userid } = req.cookie
  try {
    return Debris.where({ _id: ObjectId(req.body._id), userid }).updateOne({
      title: req.body.title,
      path: req.body.path,
      category: req.body.category
    }).then(res => {
      const { modifiedCount } = res
      console.log(res)
      if (modifiedCount) return { msg: '修改成功', data: req.body }
      return { code: -1, msg: '数据不存在', data: req.body }
    })
  } catch (error) {
    return { code: -1, msg: '修改失败', data: null }
  }
}

async function remove(req) {
  const { userid } = req.cookie
  const userInfo = await redis.get(userid) || {}
  try {
    return Debris.where({ _id: ObjectId(req.body._id), userid}).deleteOne({ _id: ObjectId(req.body._id) }).then(res => {
      const { deletedCount } = res
      return { msg: deletedCount ? '删除成功' : '删除失败', data: req.body, code: deletedCount ? null : -1 }
    })
  } catch (error) {
    return { code: -1, msg: '删除失败', data: null }
  }
}

module.exports = {
  'POST /api/debris/list': list,
  'POST /api/debris/create': create,
  'POST /api/debris/update': update,
  'POST /api/debris/remove': remove,
}