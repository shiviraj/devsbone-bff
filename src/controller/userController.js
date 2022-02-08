const express = require('express')
const logger = require('../logger/logger')
const UserService = require('../service/userService')
const { handleError, isUnauthorized } = require('../utils/errorHandlers')
const { CUSTOM_ERRORS } = require('../config/customErrorCodes')

const userController = () => {
  const router = express.Router()
  
  router.get('/validate', (req, res) => {
    UserService.validate()
      .then(({ data }) => res.send(data))
      .catch((error) => {
        if (isUnauthorized(error)) {
          UserService.getDummyUser()
            .then(({ data }) => res.status(CUSTOM_ERRORS.UNAUTHORIZED.statusCode).send(data))
            .catch((err) => {
              const customError = { message: 'Failed to fetch the dummy user' }
              logger.logAPIError(req, err, customError)
              handleError(err, res, customError)
            })
        } else {
          const customError = { message: 'Failed to validate user' }
          logger.logAPIError(req, error, customError)
          handleError(error, res, customError)
        }
      })
  })
  
  router.post('', (req, res) => {
    UserService.register(req.body)
      .then(({ data }) => res.send(data))
      .catch((error) => {
        const customError = { message: 'Failed to register a new user' }
        logger.logAPIError(req, error, customError)
        handleError(error, res, customError)
      })
  })
  
  router.get('/logout', (req, res) => {
    UserService.logout()
      .then(({ data }) => res.send(data))
      .catch((error) => {
        const customError = { message: 'Failed to logout user' }
        logger.logAPIError(req, error, customError)
        handleError(error, res, customError)
      })
  })
  
  router.get('/:userId', (req, res) => {
    UserService.getUser(req.params.userId)
      .then(({ data }) => res.send(data))
      .catch((error) => {
        const customError = { message: 'Failed to fetch user by userId', userId: req.params.userId }
        logger.logAPIError(req, error, customError)
        handleError(error, res, customError)
      })
  })
  
  return router
}

module.exports = userController()
