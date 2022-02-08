const express = require('express')
const logger = require('../logger/logger')
const OauthService = require('../service/oauthService')
const { handleError } = require('../utils/errorHandlers')

const oauthController = () => {
  const router = express.Router()
  
  router.get('/client-id', (req, res) => {
    OauthService.getClientId()
      .then(({ data }) => res.send(data))
      .catch((error) => {
        const customError = { message: 'Failed to fetch client Id' }
        logger.logAPIError(req, error, customError)
        handleError(error, res, customError)
      })
  })
  
  router.post('/code', (req, res) => {
    OauthService.signIn(req.body)
      .then(({ data }) => res.send(data))
      .catch((error) => {
        const customError = { message: 'Failed to login using oauth' }
        logger.logAPIError(req, error, customError)
        handleError(error, res, customError)
      })
  })
  
  return router
}

module.exports = oauthController()
