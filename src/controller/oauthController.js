const express = require('express')
const logger = require('../service/logger')
const {ErrorCode, DD606, ResponseCode} = require('../config/error')
const OauthService = require('../service/OauthService')
const UserService = require("../service/UserService");

const oauthController = () => {
  const router = express.Router()
  
  router.get('/client-id', (req, res) => {
    console.log("request")
    OauthService.getClientId()
      .then((response) => {
        logger.info('Successfully get response for oauth client id')
        res.send(response.data)
      })
      .catch((error) => {
        logger.error(DD606, error)
        res.status(ResponseCode.INTERNAL_SERVER_ERROR).send(DD606)
      })
  })
  
  router.post('/code', (req, res) => {
    OauthService.signIn(req.body)
      .then((response) => {
        logger.info('Successfully get response for oauth client id')
        if (!response.data) {
          res.status(ErrorCode['401']).send(response.data)
          return
        }
        res.send(response.data)
      })
      .catch((error) => {
        logger.error(error)
        res.status(error.statusCode).send(error.response)
      })
  })
  
  return router
}

module.exports = oauthController()
