const express = require('express')
const cors = require('cors')
const httpContext = require('./utils/httpContext')
const router = require('./router')
const logger = require('./logger/logger')

const app = express()

app.use((req, res, next) => {
  res.contentType('application/json')
  next()
})

app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use((req, res, next) => {
  
  /*
   * Const request = { method: req.method, url: req.url }
   * logger.info('Request:', { ...request, body: req.body })
   */
  const sendMessage = res.send
  // eslint-disable-next-line func-names
  res.send = function(responseBody) {
    // Logger.info('Response:', responseBody, 'for', request)
    // eslint-disable-next-line prefer-reflect
    sendMessage.call(this, responseBody)
  }
  next()
})

app.get('/', (req, res) => {
  res.send({ text: 'Hello Human 🖖🖖🖖🖖🖖. You have arrived at the bff server !!' })
})

app.use((req, res, next) => {
  const headers = { Authorization: req.headers.authorization }
  httpContext.set('headers', headers)
  next()
})

app.use('/api', router)

app.disable('x-powered-by')

app.all('*', (req, res, next) => {
  res.status(404).json({ message: 'Can\'t find the requested URL' })
})

module.exports = app
