const express = require('express')
const logger = require('../logger/logger')
const CategoryService = require('../service/categoryService')
const { handleError } = require('../utils/errorHandlers')

const CategoryController = () => {
  const router = express.Router()
  
  router.get('', (req, res) => {
    CategoryService.getAllCategories()
      .then(({ data }) => res.send(data))
      .catch((error) => {
        const customError = { message: 'Failed to fetch all categories' }
        logger.logAPIError(req, error, customError)
        handleError(error, res, customError)
      })
  })
  
  router.post('', (req, res) => {
    CategoryService.addNewCategory(req.body)
      .then(({ data }) => res.send(data))
      .catch((error) => {
        const customError = { message: 'Failed to add new category' }
        logger.logAPIError(req, error, customError)
        handleError(error, res, customError)
      })
  })
  
  router.post('/categories', (req, res) => {
    CategoryService.getCategories(req.body)
      .then(({ data }) => res.send(data))
      .catch((error) => {
        const customError = { message: 'Failed to fetch categories by category', categories: req.body }
        logger.logAPIError(req, error, customError)
        handleError(error, res, customError)
      })
  })
  
  router.get('/:categoryUrl/page/:page', (req, res) => {
    const { categoryUrl, page } = req.params
    CategoryService.getAllPosts(categoryUrl, page)
      .then(({ data }) => res.send(data))
      .catch((error) => {
        const customError = { message: 'Failed to fetch all posts by category', categoryUrl, page }
        logger.logAPIError(req, error, customError)
        handleError(error, res, customError)
      })
  })
  
  router.get('/:categoryUrl/count', (req, res) => {
    const { categoryUrl } = req.params
    CategoryService.countAllPosts(categoryUrl)
      .then(({ data }) => res.send(data))
      .catch((error) => {
        const customError = { message: 'Failed to fetch the post count by category', categoryUrl }
        logger.logAPIError(req, error, customError)
        handleError(error, res, customError)
      })
  })
  
  return router
}

module.exports = CategoryController()
