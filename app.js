/*
 * @Author: Tom
 * @Date: 2022-09-08 11:09:35
 * @LastEditors: Please set LastEditors
 * @Description: 
 */
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const fs = require('fs')
const cookieParser = require('cookie-parser');
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const logger = require('morgan');

const usersRouter = require('./routes/user');
const categoryRouter = require('./routes/category')
const debrisRouter = require('./routes/debris')
const test = require('./routes/test')

const authInterceptor = require('./core/authInterceptor')



const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

const ENV = process.env.NODE_ENV
if (ENV !== 'production') {
  app.use(logger('dev'))
} else {
  // 日志写入文件
  const logsFileName = path.join(__dirname, 'logs', 'access.log')
  const writeStream = fs.createWriteStream(logsFileName, {
    flags: 'a'
  })
  app.use(logger('combined', {
    stream: writeStream
  }))
}

// 允许跨域
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

const redisClient = require('./db/redis')
const sessionStore = new RedisStore({
  client: redisClient
})

app.use(session({
  secret: 'WJiol#213123_',
  cookie: {
    // path: '/', Default /
    // httpOnly: true, Default true
    maxAge: 24 * 60 * 60 * 1000
  },
  store: redisClient,
  resave: false,
  saveUninitialized: false
}))

// 权限拦截
app.use(authInterceptor)

app.use('/api/user', usersRouter);
app.use('/api/category', categoryRouter)
app.use('/api/debris', debrisRouter)
app.use('/api/test', test)



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404)); 
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500)
  res.render('error');
});

module.exports = app;
