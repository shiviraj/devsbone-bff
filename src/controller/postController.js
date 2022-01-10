const express = require('express')
const logger = require('../service/logger')
const { DD600, ResponseCode } = require('../config/error')
const PostService = require('../service/postService')
const PageService = require('../service/pageService')

const postController = () => {
  const router = express.Router()
  
  router.post('', (req, res) => {
    PostService.addNewPost()
      .then((response) => {
        logger.info('Successfully added new post', response.data.postId)
        return res.send(response.data)
      })
      .catch((error) => {
        logger.error(DD600, error)
        res.status(ResponseCode.INTERNAL_SERVER_ERROR).send(DD600)
      })
  })
  
  router.get('/:postId', (req, res) => {
    PostService.getPost(req.params.postId)
      .then((response) => {
        logger.info('successfully get post', response.data.postId)
        return res.send(response.data)
      })
      .catch((error) => {
        logger.error(DD600, error)
        res.status(ResponseCode.INTERNAL_SERVER_ERROR).send(DD600)
      })
  })
  
  router.put('/:postId', (req, res) => {
    PostService.updatePost(req.params.postId, req.body)
      .then((response) => {
        logger.info('Successfully updated post', response.data.postId)
        return res.send(response.data)
      })
      .catch((error) => {
        logger.error(DD600, error)
        res.status(ResponseCode.INTERNAL_SERVER_ERROR).send(DD600)
      })
  })
  
  router.get('/my-posts/page/:page/limit/:limit', (req, res) => {
    PostService.getMyPosts(req.params.page, req.params.limit)
      .then((response) => {
        logger.info('Successfully updated post', response.data.length)
        return res.send(response.data)
      })
      .catch((error) => {
        logger.error(DD600, error)
        res.status(ResponseCode.INTERNAL_SERVER_ERROR).send(DD600)
      })
  })
  
  router.get('/my-posts/count', (req, res) => {
    PostService.getMyPostsCount()
      .then((response) => {
        logger.info('Successfully updated post', response.data)
        return res.send(response.data)
      })
      .catch((error) => {
        logger.error(DD600, error)
        res.status(ResponseCode.INTERNAL_SERVER_ERROR).send(DD600)
      })
  })
  
  return router
}

module.exports = postController()
