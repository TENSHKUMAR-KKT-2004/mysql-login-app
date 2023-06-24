const express = require('express')
const router = express.Router()
const { requireAuth } = require('../middleware/authMiddleware')
const {login_page,authenticateUser,adminPanel,customerPanel,addProductDetails,logout} = require('../controllers/userController')


router.get('/',login_page)

router.post('/auth/login',authenticateUser)

router.get('/admin',requireAuth,adminPanel)

router.get('/customer',requireAuth,customerPanel)
router.post('/customer/product/details',requireAuth,addProductDetails)

router.post('/logout',logout)

module.exports = router