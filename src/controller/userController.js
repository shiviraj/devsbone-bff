const express = require('express')
const logger = require('../service/logger')
const { DD607, DD608, ResponseCode, DD609, DD611 } = require('../config/error')
const UserService = require('../service/userService')

const userController = () => {
  const router = express.Router()
  
  router.get('/validate', (req, res) => {
    UserService.validate()
      .then((response) => res.send(response.data))
      .catch((error) => {
        logger.error(DD607, error)
        res.sendStatus(ResponseCode.UNAUTHORIZED)
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
