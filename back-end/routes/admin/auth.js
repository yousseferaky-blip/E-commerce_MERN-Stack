const express = require('express')
const { SignIn , Signup } = require('../../controllers/admin/auth')
const { validateSignupRequest , isRequestValidate , validateSigninRequest } = require('../../validators/auth')
const router = express.Router()


router.post('/admin/signup',validateSignupRequest,isRequestValidate,Signup)


router.post('/admin/signin',validateSigninRequest,isRequestValidate,SignIn)




module.exports = router
