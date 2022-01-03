const express = require('express')
const pageController = require('../controller/pageController')
const oauthController = require('../controller/oauthController')
const userController = require('../controller/userController')

const router = express.Router()

router.use('/pages', pageController)
router.use('/oauth', oauthController)
router.use('/users', userController)

module.exports = router
