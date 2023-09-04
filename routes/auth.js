const express = require('express')
const controller = require('../controllers/auth')
const router = express.Router()

// .../api/auth/login
router.post('/login', controller.login)

router.post('/register', controller.register)

module.exports = router
