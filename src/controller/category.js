/*
 * @Author: Tom
 * @Date: 2022-07-21 22:41:24
 * @LastEditors: Please set LastEditors
 * @Description: 类别
 */

const list = () => {

  const data = [
    { name: '收藏', createDate: new Date().getTime() },
    { name: '学习', createDate: new Date().getTime() },
    { name: '生活', createDate: new Date().getTime() }
  ]

  return data
}

const create = () => {
  return  '创建成功'
}

const update = () => {
  return  '创建成功'
}

const deletes = () => {
  return '删除成功'
}

const category = {
  'GET /api/category/list': () => list(),
  'POST /api/category/create': () => create(),
  'POST /api/category/update': () => update(),
  'POST /api/category/remove': () => deletes(),
}

module.exports = category