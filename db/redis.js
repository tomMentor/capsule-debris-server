/*
 * @Author: Tom
 * @Date: 2023-02-15 11:24:23
 * @LastEditors: Please set LastEditors
 * @Description:  
 */
const redis = require('redis')
const { REDIS_URL, REDIS_PORT } = require('../db/conf/conf')

// Create 客户端
const redisClient = redis.createClient({

  url: `${REDIS_URL}:${REDIS_PORT}`,

  legacyMode: true

})

// 连接
redisClient.connect().then(() => console.log('Redis connect success !')).catch(() => console.log('Redis connect error !'))

module.exports = redisClient