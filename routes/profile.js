const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth') 
//const homeController = require('../controllers/home')
const profileController = require('../controllers/profile') 
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', ensureAuth, profileController.getProfile)

module.exports = router