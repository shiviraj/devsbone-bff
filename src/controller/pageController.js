const express = require('express')
const PageService = require('../service/pageService')
const logger = require('../logger/logger')
const { handleError } = require('../utils/errorHandlers')

const PageController = () => {
  const router = express.Router()
  
  router.post('', (req, res) => {
    PageService.addNewPage()
      .then(({ data }) => res.send(data))
      .catch((error) => {
        const customError = { message: 'Failed to add new page' }
        logger.logAPIError(req, error, customError)
        handleError(error, res, customError)
      })
  })
  
  router.get('/:pageId', (req, res) => {
    PageService.getPage(req.params.pageId)
      .then(({ data }) => res.send(data))
      .catch((error) => {
        const customError = { message: 'Failed to fetch page by pageId', pageId: req.params.pageId }
        logger.logAPIError(req, error, customError)
        handleError(error, res, customError)
      })
  })
  
  router.put('/:pageId', (req, res) => {
    PageService.updatePage(req.params.pageId, req.body)
      .then(({ data }) => res.send(data))
      .catch((error) => {
        const customError = { message: 'Failed to update page', pageId: req.params.pageId }
        logger.logAPIError(req, error, customError)
        handleError(error, res, customError)
      })
  })
  
  return router
}

module.exports = PageController()
