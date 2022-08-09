/*
 * @Author: Tom
 * @Date: 2022-08-03 14:37:05
 * @LastEditors: Please set LastEditors
 * @Description: 
 */
const Redis = require('redis')
const { REDIS_URL, REDIS_PORT } = require('./conf/conf')

const client = Redis.createClient({ url: `${REDIS_URL}:${REDIS_PORT}` })


client.on('error', (err) => console.log('Redis Client Error', err));

client.connect()


const redis = {

  async set(key, value) {
    const saveValue = typeof value === 'object' ? JSON.stringify(value) : value

    await client.set(key, saveValue)

  },

  async get(key) {

    if (!key) return null

    try {
      
      return JSON.parse(await client.get(key))

    } catch (error) {

      return await client.get(key)

    }

  }

}
module.exports = redis