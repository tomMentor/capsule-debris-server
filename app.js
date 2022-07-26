/*
 * @Author: Tom
 * @Date: 2022-07-21 21:01:18
 * @LastEditors: Please set LastEditors
 * @Description: Server handle
 */

const routers = require('./src/router/request')
const querystring = require('querystring')
const disposePostData = require('./src/router/disposePostData')

const { ErrorModule, SuccessModule } = require('./src/modules/responseModule')

const serverHandle = (request, response) => {

  // 设置返回格式 JSON
  response.setHeader("Content-Type", "application/json")

  const method = request.method

  const url = request.url.split('?')[0]

  const query = querystring.parse(request.url.split('?')[1])

  request.path = url

  request.query = query

  disposePostData(request).then(data => {
    
    let result = null

    request.body = data


    if (method === 'GET') result = routers.GET(request, response)

    if (method === 'POST') result = routers.POST(request, response)

    if (result) {

      response.end(JSON.stringify(new SuccessModule(result, '成功')))
      return 

    }

    response.end(JSON.stringify({
      msg: `${url} not find`,
      code: 404
    }))

  })

}

module.exports = serverHandle