const express = require('express')
const logger = require('../service/logger')
const { DD600, ResponseCode } = require('../config/error')
const CommentService = require('../service/commentService')

const CommentController = () => {
  const router = express.Router()
  
  router.get('/:postId', (req, res) => {
    CommentService.getAllComments(req.params.postId)
      .then((response) => {
        logger.info('Successfully added new tag', response.data.length)
        return res.send(response.data)
      })
      .catch((error) => {
        logger.error(DD600, error)
        res.status(ResponseCode.INTERNAL_SERVER_ERROR).send(DD600)
      })
  })
  
  router.post('/:postId', (req, res) => {
    CommentService.addComment(req.params.postId, req.body)
      .then((response) => {
        logger.info('Successfully added new tag', response.data.commentId)
        return res.send(response.data)
      })
      .catch((error) => {
        logger.error(DD600, error)
        res.status(ResponseCode.INTERNAL_SERVER_ERROR).send(DD600)
      })
  })
  
  router.put('/:commentId', (req, res) => {
    CommentService.addLikeOnComment(req.params.commentId, req.body)
      .then((response) => {
        logger.info('Successfully added new tag', response.data.commentId)
        return res.send(response.data)
      })
      .catch((error) => {
        logger.error(DD600, error)
        res.status(ResponseCode.INTERNAL_SERVER_ERROR).send(DD600)
      })
  })
  
  return router
}

module.exports = CommentController()
