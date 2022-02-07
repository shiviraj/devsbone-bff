const express = require('express')
const PageService = require('../service/pageService')
const logger = require('../logger/logger')

const PageController = () => {
  const router = express.Router()
  
  router.post('', (req, res) => {
    PageService.addNewPage()
      .then((response) => {
        logger.info('Successfully added new page', response.data)
        return res.send(response.data)
      })
  
    /*
     * .catch((error) => {
     *   logger.error(DD600, error)
     *   res.status(ResponseCode.INTERNAL_SERVER_ERROR).send(DD600)
     * })
     */
  })
  
  router.get('/:pageId', (req, res) => {
    PageService.getPage(req.params.pageId)
      .then((response) => {
        logger.info('Successfully added new page', response.data.pageId)
        return res.send(response.data)
      })
  
    /*
     * .catch((error) => {
     *   logger.error(DD600, error)
     *   res.status(ResponseCode.INTERNAL_SERVER_ERROR).send(DD600)
     * })
     */
  })
  
  router.put('/:pageId', (req, res) => {
    PageService.updatePage(req.params.pageId, req.body)
      .then((response) => {
        logger.info('Successfully updated page', response.data.pageId)
        return res.send(response.data)
      })
  
    /*
     * .catch((error) => {
     *   logger.error(DD600, error)
     *   res.status(ResponseCode.INTERNAL_SERVER_ERROR).send(DD600)
     * })
     */
  })
  
  
  return router
}

module.exports = PageController()
