const express = require('express')
const router = express.Router()
const{
    registerUser,
    loginUser,
}=require('../controller/userController')
router.post('/user/registerUser',registerUser)
router.post('/user/loginUser',loginUser)

module.exports = router