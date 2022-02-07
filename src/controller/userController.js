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
              logger.error(err, 'Failed to get dummy')
              handleError(err, res)
            })
        } else {
          logger.error(error, 'Failed to validate user')
          handleError(error, res)
        }
      })
  })
  
  router.post('', (req, res) => {
    UserService.register(req.body)
      .then((response) => {
        logger.info('Successfully register user')
        return res.send(response.data)
      })
      .catch((error) => {
        logger.error(DD608, error)
        res.sendStatus(ResponseCode.BAD_REQUEST)
      })
  })
  
  router.get('/logout', (req, res) => {
    UserService.logout()
      .then((response) => {
        logger.info('Successfully user logout')
        return res.send(response.data)
      })
      .catch((error) => {
        logger.error(DD609, error)
        res.status(ResponseCode.BAD_REQUEST).send(DD609)
      })
  })
  
  router.get('/:userId', (req, res) => {
    UserService.getUser(req.params.userId)
      .then((response) => {
        logger.info('Successfully fetch all users')
        return res.send(response.data)
      })
      .catch((error) => {
        logger.error(DD611, error)
        res.status(ResponseCode.BAD_REQUEST).send(DD611)
      })
  })
  
  return router
}

module.exports = userController()
