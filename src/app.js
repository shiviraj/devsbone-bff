const express = require('express')
const cors = require('cors')
const httpContext = require('express-http-context')

const router = require('./router')
const logger = require('./service/logger')

const app = express()

app.use((req, res, next) => {
  res.contentType('application/json')
  next()
})

app.use(express.json({limit: '1mb'}))
app.use(express.urlencoded({extended: true}))

app.use((req, res, next) => {
  const request = {method: req.method, url: req.url}
  logger.info('Request:', {...request, body: req.body})
  const sendMessage = res.send
  // eslint-disable-next-line func-names
  res.send = function (responseBody) {
    logger.info('Response:', responseBody, 'for', request)
    // eslint-disable-next-line prefer-reflect
    sendMessage.call(this, responseBody)
  }
  next()
})

app.get('/', (req, res) => {
  res.send({text: 'Hello Human 🖖🖖🖖🖖🖖. You have arrived at the digital dustbin server !!'})
})

app.use(httpContext.middleware)

app.use((req, res, next) => {
  const headers = {Authorization: req.headers.authorization}
  httpContext.set('headers', headers)
  next()
})

app.use(cors())
app.use('/api', router)

app.disable('x-powered-by')

module.exports = app
