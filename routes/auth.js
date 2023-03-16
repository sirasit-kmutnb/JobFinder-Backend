const express = require('express')
const router = express.Router()
const { register, login, accountInfo } = require('../controller/authController.js')
const { requireLogin } = require('../controller/authController')

router.post('/register', register)
router.post('/login', login)
router.post('/accountInfo', accountInfo)

module.exports = router