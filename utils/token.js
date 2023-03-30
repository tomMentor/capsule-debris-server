const JWT = require('jsonwebtoken')
const jwt = require('../config/jwt')

function set(plaintext) {

  const data = { ...plaintext }
  return new Promise((reslove) => {

    const token = JWT.sign(data, jwt.key,  { expiresIn: jwt.expiresIn })

    reslove(token)

  })
  
}

async function get(token) {
  
  return new Promise((reslove, reject) => {

    JWT.verify(token, jwt.key, (err, decoded) => {
      if (err) {
        // JWT 过期
        reject()
      } else {
        reslove(decoded)
      }
    })

  })

}

module.exports = { set, get }