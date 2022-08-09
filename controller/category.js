/*
 * @Author: Tom
 * @Date: 2022-07-21 22:41:24
 * @LastEditors: Please set LastEditors
 * @Description: 类别
 */
const Category = require('../module/category')
const ObjectId = require('mongoose').Types.ObjectId
const redis = require('../db/redis')
const list = async (req) => {
  const { userid } = req.cookie
  const data = req.body || {}
  try {
    return Category.find({ ...data, userid }).then(res => {
      return { data: res }
    }).catch(err => {
      console.log(err)
    })
  } catch (error) {
    
  }
 
}

const create = async (req) => {
  const { userid } = req.cookie
  const userData = await redis.get(userid)
  const data = { ...req.body, author: userData['userName'], userid }
  try {
    return Category.create(data).then(res => {
      return { data: data }
    }).catch(err => {
      console.log(err)
      return { data: null, code: -1 }
    })
  } catch (error) {
    
  }
}

const update = async (req) => {
  const { userid } = req.cookie

  try {
    return Category.where({ _id: ObjectId(req.body._id), userid }).updateOne({
      name: req.body.name
    }).then(res => {
      const { modifiedCount } = res
      if (modifiedCount) return { msg: '修改成功', data: req.body }
      return { code: -1, msg: '数据不存在', data: req.body }
    }).catch(err => console.log(err))
  } catch (error) {
    return { code: -1, msg: '修改失败', data: null }
  }
}

async function remove(req) {
  const { userid } = req.cookie
  const userInfo = await redis.get(userid) || {}
  try {
    return Category.where({ _id: ObjectId(req.body._id), userid: userInfo['userid'] }).deleteOne({ _id: ObjectId(req.body._id) }).then(res => {
      const { deletedCount } = res
      return { msg: deletedCount ? '删除成功' : '删除失败', data: req.body, code: deletedCount ? null : -1 }
    })
  } catch (error) {
    return { code: -1, msg: '删除失败', data: null }
  }
}

const category = {
  'GET /api/category/list': list,
  'POST /api/category/create': create,
  'POST /api/category/update': update,
  'POST /api/category/remove': remove
}

module.exports = category