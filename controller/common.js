/*
 * @Author: Tom
 * @Date: 2022-07-26 14:33:39
 * @LastEditors: Please set LastEditors
 * @Description: 
 */
const Common = require('../module/common')
const ObjectId = require('mongoose').Types.ObjectId
const redis = require('../db/redis')

function list(req) {
  const { userid } = req.cookie
  return Common.find({ userid: userid, ...req.body || {} }).then(res => {
    return { data: res, msg: '查询成功' }
  })
}

async function create(req) {
  const { userid } = req.cookie
  const userInfo = await redis.get(userid) || {}
  const data = { ...req.body, author: userInfo['userName'], userid }

  return Common.create(data).then(res => {

    return { data, msg: '创建成功' }
  
  }).catch(err => {
    return { code: -1, msg: '创建失败', data: err.errors }

  })

}

async function update(req) {
  const { userid } = req.cookie
  const userInfo = await redis.get(userid) || {}
  try {
    return Common.where({ _id: ObjectId(req.body._id), userid: userInfo['userid'], }).update({
      name: req.body.name
    }).then(res => {
      const { modifiedCount } = res
      if (modifiedCount) return { msg: '修改成功', data: req.body }
      return { code: -1, msg: '数据不存在', data: req.body }
    })
  } catch (error) {
    return { code: -1, msg: '修改失败', data: null }
  }
}

function remove(req) {
  const { userid } = req.cookie
  try {
    return Common.where({ _id: ObjectId(req.body._id), userid }).deleteOne({ _id: ObjectId(req.body._id) }).then(res => {
      const { deletedCount } = res
      return { msg: deletedCount ? '删除成功' : '删除失败', data: req.body, code: deletedCount ? null : -1 }
    })
  } catch (error) {
    return { code: -1, msg: '删除失败', data: null }
  }
}

module.exports = {
  'POST /api/common/list': list,
  'POST /api/common/create': create,
  'POST /api/common/update': update,
  'POST /api/common/remove': remove,
}