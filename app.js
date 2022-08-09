/*
 * @Author: Tom
 * @Date: 2022-07-21 21:01:18
 * @LastEditors: Please set LastEditors
 * @Description: Server handle
 */

const routers = require('./src/router/request')
const querystring = require('querystring')
const disposePostData = require('./src/router/disposePostData')
const redis = require('./db/redis')
const util = require('./src/tool/util')
const logs = require('./src/tool/logs')


const { ErrorModule, SuccessModule } = require('./src/modules/responseModule')

const serverHandle = async (request, response) => {

  // 设置返回格式 JSON
  response.setHeader("Content-Type", "application/json")

  logs.successe(request)

  const method = request.method

  const url = request.url.split('?')[0]

  // 参数解析
  const query = querystring.parse(request.url.split('?')[1])

  const cookie = request.headers.cookie

  request.cookie = util.cookieParsing(cookie) || {}
  request.path = url
  request.query = query

   disposePostData(request).then(async data => {
    
    let result = null

    request.body = data

    let userId = request.cookie.userid
    
    if (!userId) {

      userId = `${Date.now()}${Math.random()}`
      // init Seesion
      redis.set(userId, {})
      
    }
    request.sessionId = userId
    const redis_user_id = await redis.get(request.sessionId)
    if (!redis_user_id) {
      redis.set(request.sessionId, {})
      request.session = {}
    } else {
      request.session = redis_user_id
    }

    if (method === 'GET') result = await routers.GET(request, response)

    if (method === 'POST') result = await routers.POST(request, response)
    if (result) {
      response.end(JSON.stringify(new SuccessModule(result)))
      return 
    }

    response.end(JSON.stringify({
      msg: `${url} not find`,
      code: 404
    }))

  })

}

module.exports = serverHandle