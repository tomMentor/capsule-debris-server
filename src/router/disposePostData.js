/*
 * @Author: Tom
 * @Date: 2022-07-22 10:55:43
 * @LastEditors: Please set LastEditors
 * @Description: 
 */
const disposePostData = (req) => {
  return new Promise((reslove, reject) => {
    const method = req.method

    if (method !== 'POST') {
      reslove({})
      return
    }

    if (req.headers['content-type'] !== 'application/json') {
      reslove({})
      return
    }
    
    let postData = ''

    req.on('data', chunk => {
      postData += chunk.toString()
    })

    req.on('end', () => {
     
      if (!postData) {
        reslove({})
        return 
      }
      reslove(JSON.parse(postData))

    })
  })
  
}

module.exports = disposePostData