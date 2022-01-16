const express = require('express')
const pageController = require('../controller/pageController')
const postController = require('../controller/postController')
const categoryController = require('../controller/categoryController')
const tagController = require('../controller/tagController')
const oauthController = require('../controller/oauthController')
const userController = require('../controller/userController')
const commentController = require('../controller/commentController')
const mediaController = require('../controller/mediaController')

const router = express.Router()

router.use('/pages', pageController)
router.use('/posts', postController)
router.use('/categories', categoryController)
router.use('/tags', tagController)
router.use('/oauth', oauthController)
router.use('/media', mediaController)
router.use('/users', userController)
router.use('/comments', commentController)

module.exports = router
