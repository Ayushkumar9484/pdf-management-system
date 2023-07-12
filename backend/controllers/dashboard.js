const asyncHandler = require("../middleware/async")
const User = require("../model/user")
const Pdf = require('../model/pdf')
const ErrorResponse = require("../utils/errorResponse")
const jwt = require('jsonwebtoken')

// @desc    DashBoard
// @route   POST /api/v1/auth/
// @access  Public

exports.dashboard = asyncHandler( async (req,res,next) => {
    const {token} = req.body
    if(!token)
    {
        return next(new ErrorResponse('No Token found',404))
    }
    const decoded =  jwt.verify(token,"3425876971357347642767685767")
    const user = await User.findById(decoded.id)
    const {email,name}=user
    const all_pdf_to_this_user = await Pdf.find({email})
    res.status(200).json({
        success:true,
        message:"dashboard done",
        count:all_pdf_to_this_user.length,
        data:all_pdf_to_this_user,
        name
    })
})