/*
 * @Author: Tom
 * @Date: 2023-02-22 14:39:05
 * @LastEditors: Please set LastEditors
 * @Description: 分类核心
 */
const Category = require('../controller/category')
const { SuccessModel, ErrorModel } = require('../model/resModel')

/**
 * @description: 创建分类
 * @param {*} req
 * @param {*} res
 * @return {*}
 */
async function create(req, res) {

  const { name } = req.body
  const { _id: userId } = req.data


  const cateory = await Category.findOne({ name, userId })


  if (cateory) return res.json(new ErrorModel('分类已存在！'))

  const createCategory = await Category.create({ 
    name, userId 
  })

  if (!createCategory) return res.json(new ErrorModel('创建失败！')) 
  return res.json(new SuccessModel({ message: '创建成功', data: createCategory })) 

}


/**
 * @description: 删除分类
 * @param {*} req
 * @param {*} res
 * @return {*}
 */
async function remove(req, res) { 

  const { id } = req.body
  const { _id: userId } = req.data

  const remove = await Category.findOneAndRemove({ _id: id, userId }, {
    new: true
  })

  if (!remove) return res.json(new ErrorModel('当前分类不存在，删除失败！'))
  return res.json(new SuccessModel({ message: '删除成功', data: remove })) 

}

/**
 * @description: 编辑分类
 * @param {*} req
 * @param {*} res
 * @return {*}
 */
async function update(req, res) {

  const { name, id } = req.body
  const { _id: userId } = req.data
  const update = await Category.findOneAndUpdate({ id, userId }, {
    name
  }, { new: true })

  if (update) return res.json(new SuccessModel({ message: '编辑成功', data: update })) 

  res.json(new ErrorModel('编辑失败'))
}


/**
 * @description: 查询分类
 * @param {*} req
 * @param {*} res
 * @return {*}
 */
async function list(req, res) {

  const { _id: userId } = req.data

  const list = await Category.find({ userId })

  res.json(new SuccessModel({ message: '成功', data: list })) 

}

module.exports = { create, remove, update, list }