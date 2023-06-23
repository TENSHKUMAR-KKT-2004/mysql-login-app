const express = require('express')
const router = express.Router()
const {login_page} = require('../controllers/userController')

router.get('/',login_page)

module.exports = router