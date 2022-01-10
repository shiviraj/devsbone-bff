const express = require('express')
const logger = require('../service/logger')
const { DD600, ResponseCode } = require('../config/error')
const CategoryService = require('../service/categoryService')
const TagService = require('../service/tagService')

const TagController = () => {
  const router = express.Router()
  
  router.post('', (req, res) => {
    TagService.addNewTag(req.body)
      .then((response) => {
        logger.info('Successfully added new tag', response.data.tagId)
        return res.send(response.data)
      })
      .catch((error) => {
        logger.error(DD600, error)
        res.status(ResponseCode.INTERNAL_SERVER_ERROR).send(DD600)
      })
  })
  
  
  return router
}

module.exports = TagController()
