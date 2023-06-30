const express = require('express')
const router = express.Router()
const { requireAuth } = require('../middleware/authMiddleware')
const {login_page,authenticateUser,adminPanel,userPanel,addDetails,logout} = require('../controllers/userController')


router.get('/',login_page)

router.post('/auth/login',authenticateUser)

router.get('/user-panel',requireAuth,userPanel)

router.get('/change-password',adminPanel)

router.get('/product/add-details',requireAuth,addDetails)



router.post('/product/details',requireAuth,adminPanel)

router.post('/logout',logout)

module.exports = router