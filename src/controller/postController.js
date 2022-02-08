const express = require('express')
const logger = require('../logger/logger')
const PostService = require('../service/postService')
const { handleError } = require('../utils/errorHandlers')

const postController = () => {
  const router = express.Router()
  
  router.post('/author', (req, res) => {
    PostService.addNewPost()
      .then(({ data }) => res.send(data))
      .catch((error) => {
        const customError = { message: 'Failed to add new post' }
        logger.logAPIError(req, error, customError)
        handleError(error, res, customError)
      })
  })
  
  router.get('/author/:postId', (req, res) => {
    PostService.getPost(req.params.postId)
      .then(({ data }) => res.send(data))
      .catch((error) => {
        const customError = { message: 'Failed to get post of author', postId: req.params.postId }
        logger.logAPIError(req, error, customError)
        handleError(error, res, customError)
      })
  })
  
  router.get('/author/:postId/url-available/:url', (req, res) => {
    const { postId, url } = req.params
    PostService.isUrlAvailable(postId, url)
      .then(({ data }) => res.send(data))
      .catch((error) => {
        const customError = { message: 'Failed to fetch the post url availability', postId, url }
        logger.logAPIError(req, error, customError)
        handleError(error, res, customError)
      })
  })
  
  router.put('/author/:postId', (req, res) => {
    PostService.updatePost(req.params.postId, req.body)
      .then(({ data }) => res.send(data))
      .catch((error) => {
        const customError = { message: 'Failed to update the post', postId: req.params.postId }
        logger.logAPIError(req, error, customError)
        handleError(error, res, customError)
      })
  })
  
  router.get('/author/my-posts/page/:page/limit/:limit', (req, res) => {
    const { page, limit } = req.params
    PostService.getMyPosts(page, limit)
      .then(({ data }) => res.send(data))
      .catch((error) => {
        const customError = { message: 'Failed to fetch the author\'s posts', page, limit }
        logger.logAPIError(req, error, customError)
        handleError(error, res, customError)
      })
  })
  
  router.get('/author/my-posts/count', (req, res) => {
    PostService.getMyPostsCount()
      .then(({ data }) => res.send(data))
      .catch((error) => {
        const customError = { message: 'Failed to fetch the author\'s post count' }
        logger.logAPIError(req, error, customError)
        handleError(error, res, customError)
      })
  })
  
  router.get('/page/:page', (req, res) => {
    PostService.getPublishedPosts(req.params.page)
      .then(({ data }) => res.send(data))
      .catch((error) => {
        const customError = { message: 'Failed to fetch posts', page: req.params.page }
        logger.logAPIError(req, error, customError)
        handleError(error, res, customError)
      })
  })
  
  router.get('/count', (req, res) => {
    PostService.getPostsCount()
      .then(({ data }) => res.send(data))
      .catch((error) => {
        const customError = { message: 'Failed to fetch the post count' }
        logger.logAPIError(req, error, customError)
        handleError(error, res, customError)
      })
  })
  
  router.get('/:postUrl', (req, res) => {
    PostService.getPublishedPost(req.params.postUrl)
      .then(({ data }) => res.send(data))
      .catch((error) => {
        const customError = { message: 'Failed to fetch the post by post url', url: req.params.postUrl }
        logger.logAPIError(req, error, customError)
        handleError(error, res, customError)
      })
  })
  
  router.put('/:postId', (req, res) => {
    PostService.addLikeOrDislike(req.params.postId, req.body)
      .then(({ data }) => res.send(data))
      .catch((error) => {
        const customError = { message: 'Failed to update like or dislike on post', postId: req.params.postId }
        logger.logAPIError(req, error, customError)
        handleError(error, res, customError)
      })
  })
  
  return router
}

module.exports = postController()
