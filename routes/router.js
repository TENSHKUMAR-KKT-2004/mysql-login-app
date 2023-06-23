const express = require('express')
const router = express.Router()
const {login_page,authenticateUser,adminPanel,customerPanel} = require('../controllers/userController')

router.get('/',login_page)
router.post('/auth/login',authenticateUser)
router.get('/admin',adminPanel)
router.get('/customer',customerPanel)

module.exports = router