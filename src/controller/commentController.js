const express = require('express')
const logger = require('../logger/logger')
const CommentService = require('../service/commentService')
const { handleError } = require('../utils/errorHandlers')

const CommentController = () => {
  const router = express.Router()
  
  router.get('/:postId', (req, res) => {
    CommentService.getAllComments(req.params.postId)
      .then(({ data }) => res.send(data))
      .catch((error) => {
        const customError = { message: 'Failed to fetch all comments of post', postId: req.params.postId }
        logger.logAPIError(req, error, customError)
        handleError(error, res, customError)
      })
  })
  
  router.post('/:postId', (req, res) => {
    CommentService.addComment(req.params.postId, req.body)
      .then(({ data }) => res.send(data))
      .catch((error) => {
        const customError = { message: 'Failed to add new comment', postId: req.params.postId }
        logger.logAPIError(req, error, customError)
        handleError(error, res, customError)
      })
  })
  
  router.put('/:commentId', (req, res) => {
    CommentService.addLikeOnComment(req.params.commentId, req.body)
      .then(({ data }) => res.send(data))
      .catch((error) => {
        const customError = { message: 'Failed to update like or dislike on comment', commentId: req.params.commentId }
        logger.logAPIError(req, error, customError)
        handleError(error, res, customError)
      })
  })
  
  return router
}

module.exports = CommentController()
