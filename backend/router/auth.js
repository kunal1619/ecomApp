const express = require('express');
const router = express.Router();
const {createSignUpUser, loginUser} = require('../controller/authUser')

router.post('/signup', createSignUpUser)
router.post('/login',  loginUser)


module.exports = router;