/*
 * @Author: Tom
 * @Date: 2022-07-27 10:34:48
 * @LastEditors: Please set LastEditors
 * @Description: 
 */
function cookieParsing(cookie, data = {}) {
  if (!cookie) return
  cookie.split(';').map(item => {
    if (!item) return
    let [ key, value ] = item.split('=')
    key = key ? key.trim() : key
    value = value ? value.trim() : value
    data[key] = value
  })
  return data
  
}

function cookieExpires() {
  const d = new Date()
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
  return d.toGMTString()
}

module.exports = {
  cookieParsing,
  cookieExpires
}