/*
 * @Author: Tom
 * @Date: 2022-07-21 22:42:49
 * @LastEditors: Please set LastEditors
 * @Description: 路由入口
 */
// const { GET, POST } = require('./request')
const category = require('./category')


// const routers = (res, req) => {

//   const method = res.method

//   const api = {
//     GET: (path, query) => category[path](),
//     POST(path, params) {
//       req.on('data', chunk => {
//         console.log(chunk)
//       })
//     }
//   } 

//   let categorye =  null

//   if (method === 'GET') categorye = api.GET(res.path, res.query)

//   if (method === 'POST') categorye = api.POST(res.path, req)

//   return categorye
// }

const routers = {
  GET(req, res) {
    return category[req.path]()
  } ,
  POST(req, res) {
    
    return req.body
  }
}

module.exports = routers
