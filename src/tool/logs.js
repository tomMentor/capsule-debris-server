/*
 * @Author: Tom
 * @Date: 2022-08-04 15:05:50
 * @LastEditors: Please set LastEditors
 * @Description: 
 * 
 * @Step 1 - 创建 Write Stream ｜ createWriteStream
 * @Step 2 - 写入访问日志 ｜ successe
 * @Step 3 写入日志 ｜ createLogs
 * 
 */
const fs = require('fs')
const path = require('path')

/**
 * @description: 创建日志
 * @param {*} response
 * @return {*}
 */
function createLogs(writeStream, response) {
  const userAgent = response.headers['user-agent']
  const logs = `${new Date()} -- ${response.method} ${response.url} -- ${userAgent} \n`
  writeStream.write(logs)
}

/**
 * @description: 创建 Write Stream
 * @param {*} filename
 * @return {*}
 */
function createWriteStream(filename) {
  const success = path.join(__dirname, '../', '../', 'logs/', filename)
  const writeStream = fs.createWriteStream(success, {
    flags: 'a'
  })
  return writeStream
}

const writeStream = createWriteStream('success.log')
function successe(response) {
  createLogs(writeStream, response)
}

module.exports = {
  successe
}