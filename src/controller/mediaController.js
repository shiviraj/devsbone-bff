const express = require('express')
const logger = require('../logger/logger')
const MediaService = require('../service/mediaService')
const { handleError } = require('../utils/errorHandlers')

const mediaController = () => {
  const router = express.Router()
  
  router.post('/upload-image/:id', MediaService.validate(), (req, res) => {
    MediaService.upload(req.params.id, req.file)
      .then((response) => res.send({ success: 1, file: { url: response.secure_url } }))
      .catch((error) => {
        const customError = { message: 'Failed to upload image', id: req.params.id }
        logger.logAPIError(req, error, customError)
        handleError(error, res, customError)
      })
  })
  
  router.post('/upload-image-byUrl/:id', (req, res) => {
    res.send({ success: 1, file: { url: req.body.url } })
  })
  return router
}

module.exports = mediaController()
