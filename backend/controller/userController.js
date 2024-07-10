const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User =require('../model/userModel')
// @desc registerUser
// @route POST user/registerUser
// @access public
const registerUser=asyncHandler(async(req,res)=>{
    const{name,email,password,isAdmain}=req.body
    const checkUser=await User.findOne({email})
    if(checkUser){
        res.send("user exists")
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const user= await User.create({
        name,
        email,
        password:hashedPassword,
       
    })
    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            isAdmin:user.isAdmin,
            isActive:user.isActive,
            token: generateToken(user._id),
          })
    }else {
        res.status(400)
        throw new Error('Invalid user data')
      }
})

// @desc loginUser
// @route POST user/loginUser
// @access public
const loginUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body
    //check for user 
    const user=await User.findOne({email})
    if(!user) res.json("User Dosenot exists")
    if(user && await bcrypt.compare(password, user.password)){
        res.json({
            _id:user.id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            isActive:user.isActive,
            subject:user.subject,
            token:generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid user login')
    }
})
// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    })
  }
  module.exports = {
    registerUser,
    loginUser,
  }
