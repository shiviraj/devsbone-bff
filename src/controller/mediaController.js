const express = require('express')
const logger = require('../service/logger')
const { DD607, DD608, ResponseCode, DD609, DD611, DD600 } = require('../config/error')
const MediaService = require('../service/mediaService')

const mediaController = () => {
  const router = express.Router()
  
  router.post('/upload-image/:id', MediaService.validate(), (req, res) => {
    MediaService.upload(req.params.id, req.file)
      .then((response) => {
        logger.info('Successfully updated page', req.params.id)
        res.send({ success: 1, file: { url: response.secure_url } })
      })
      .catch((error) => {
        logger.error(DD600, error)
        res.status(ResponseCode.INTERNAL_SERVER_ERROR).send({ success: 0 })
      })
  })
  
  router.post('/upload-image-byUrl/:id', MediaService.validate(), (req, res) => {
    res.send({ success: 1, file: { url: req.body.url } })
  })
  return router
}

module.exports = mediaController()
