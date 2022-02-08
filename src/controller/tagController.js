const express = require('express')
const logger = require('../logger/logger')
const TagService = require('../service/tagService')
const { handleError } = require('../utils/errorHandlers')

const TagController = () => {
  const router = express.Router()
  
  router.post('', (req, res) => {
    TagService.addNewTag(req.body)
      .then(({ data }) => res.send(data))
      .catch((error) => {
        const customError = { message: 'Failed to add new tag' }
        logger.logAPIError(req, error, customError)
        handleError(error, res, customError)
      })
  })
  
  router.post('/tags', (req, res) => {
    TagService.getAllTag(req.body)
      .then(({ data }) => res.send(data))
      .catch((error) => {
        const customError = { message: 'Failed to fetch all tags' }
        logger.logAPIError(req, error, customError)
        handleError(error, res, customError)
      })
  })
  
  router.get('/:tagName', (req, res) => {
    TagService.getTagsByTagName(req.params.tagName)
      .then(({ data }) => res.send(data))
      .catch((error) => {
        const customError = { message: 'Failed to fetch tags by tag name', tagName: req.params.tagName }
        logger.logAPIError(req, error, customError)
        handleError(error, res, customError)
      })
  })
  
  return router
}

module.exports = TagController()
