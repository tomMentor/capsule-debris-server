/*
 * @Author: Tom
 * @Date: 2022-07-21 11:29:01
 * @LastEditors: Please set LastEditors
 * @Description: 
 */

const http = require('http')
const serverHandle = require('../app')

const server = http.createServer(serverHandle)

server.listen(8010)
