const express = require('express')
const router = express.Router()
const { requireAuth } = require('../middleware/authMiddleware')
const {login_page,authenticateUser,changePasswordPage,changePassword,orderList,userPanel,addDetails,logout} = require('../controllers/userController')


router.get('/',login_page)

router.post('/auth/login',authenticateUser)

//
router.get('/user-panel',requireAuth,userPanel)

router.get('/change-password-page',changePasswordPage)

router.post('/change-password',changePassword)

//
router.post('/product/add-details',requireAuth,addDetails)

router.get('/product-details',orderList)

router.post('/logout',logout)

module.exports = router