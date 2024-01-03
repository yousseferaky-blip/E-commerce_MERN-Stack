const express = require('express');
const { SignIn, Signup, getUsers, deleteUserById, getUserById, updateUserById , getCurrentUser } = require('../controllers/auth');
const { validateSignupRequest, isRequestValidate, validateSigninRequest } = require('../validators/auth');
const { requireSignIn } = require('../middleware/index');
const router = express.Router();

router.post('/signup', validateSignupRequest, isRequestValidate, Signup);
router.post('/signin', validateSigninRequest, isRequestValidate, SignIn);
router.get('/users', getUsers);
router.delete('/user/:id', deleteUserById);
router.get('/user/:id', getUserById);
router.put('/user/:id', updateUserById);
router.get('/current-user',requireSignIn , getCurrentUser);  

module.exports = router;
