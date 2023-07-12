const asyncHandler = require("../middleware/async")
const User = require("../model/user")
const ErrorResponse = require("../utils/errorResponse")
const jwt = require('jsonwebtoken')
const Pdf = require('../model/pdf')

// @desc    Save Pdf
// @route   POST /api/v1/pdf/save
// @access  Public

exports.savepdf = asyncHandler( async (req,res,next) => {
    // const {token,pdf,review} = req.body
    const path = (req.file) ? req.file.filename :null
    const filename = (req.file) ? req.file.originalname:null
    console.log(req.file)
    const {token}=req.body
    if(!token)
    {
        return next(new ErrorResponse('No Token found',404))
    }
    const decoded =  jwt.verify(token,"3425876971357347642767685767")
    const user = await User.findById(decoded.id)
    const {email} = user;
    const pdf_saved = await Pdf.create({
        email,path,filename
    })
    res.status(200).json({
        success:true,
        message:"save pdf done",
        pdf_saved
    })
})