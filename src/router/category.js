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

const category = {
  '/api/category/list': () => list(),
  '/api/category/create': () => create(),
}

module.exports = category