const proxy = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(proxy('/auth/google', { target: 'http://localhost:5000' })) // this specify that when we use a relative path of /auth/google then forward the request to http://localhost:5000/auth/google, even though the above url will be http://localhost:3000/auth/google
  app.use(proxy('/api/*', { target: 'http://localhost:5000' }))
  app.use(proxy('/api/surveys/**/**', { target: 'http://localhost:5000' }))
}
