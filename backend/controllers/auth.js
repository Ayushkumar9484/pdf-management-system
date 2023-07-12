const asyncHandler = require("../middleware/async")
const User = require("../model/user")
const ErrorResponse = require("../utils/errorResponse")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


// @desc    Login User
// @route   POST /api/v1/auth/login
// @access  Public

exports.login = asyncHandler(async(req,res,next) =>{
    const {email, password} = req.body

    if(!email || !password)
    {
        return next(new ErrorResponse('Please enter email and password',400))
    }
    const user =await User.findOne({email}).select("+password")
    if(!user)
    {
        return next(new ErrorResponse('User not found',404))
    }
    const isMatch=await user.matchPassword(password);
    if(!isMatch)
    {
        return next(new ErrorResponse('Invalid Credentials',401))
    }
    sendTokenResponse(user,200,res);
})

// @desc    Register User
// @route   POST /api/v1/auth/register
// @access  Public

exports.register = asyncHandler( async (req,res,next) =>{
    const {name,email, password,reEnterPassword} =  req.body
    // console.log(name, email, password,reEnterPassword)
    if(!(password === reEnterPassword))
    {
        return next(new ErrorResponse('Passwords are not matched',404))
    }
    const user = await User.create({
        name,email,password
    })
   
    res.status(201).json({
        success:true,
        message:"User register succesfully",
        user
    })
})


// Get token from model, create cookie and send response
const sendTokenResponse = (user,statusCode,res) =>{
    // Create Token
    const token = user.getSignedJwtToken()
    const options = {
        expires: new Date(Date.now()+1*24*60*60*1000),
        httpOnly: true,
    }

    if(process.env.NODE_ENV === 'production')
    {
        options.secure = true
    }
    res
        .status(statusCode)
        .cookie('token',token,options)
        .json({
            success:true,
            token,
            name:user.name
        }) 
}



