const asyncHandler = require("../middleware/async")
const User = require("../model/user")
const Pdf = require('../model/pdf')
const ErrorResponse = require("../utils/errorResponse")
const Comment = require('../model/Comment')
const jwt = require('jsonwebtoken')

// @desc    Comment
// @route   POST /api/v1/comment/
// @access  Public

exports.Savecomment = asyncHandler( async (req,res,next) => {
    console.log("SAVE COMMENT IS CALLED")
    const {token,comment,pdfName} = req.body
    console.log(token,comment,pdfName)

    let user_id =  jwt.verify(token,"3425876971357347642767685767")
    const Current_user =await User.findById(user_id.id)
    const user = Current_user._id
    const pdf = await Pdf.find({filename:pdfName})
    const filename = pdf[0]._id;
    const PDF_comment = await Comment.create({
        filename,user,comment
    })
    res.status(200).json({
        success:true,
        PDF_comment
    })
})

exports.getComment = asyncHandler( async (req,res,next) => {
    const {token, filename} = req.body
    const response = await Comment.find().populate([{
        path:"filename",
        select:'filename'
    },
    {
        path:"user",
        select:"name"
    }]);
    const result= response.filter((data)=>{
        if(data.filename.filename === filename) return true;
        return false;
    })
    
    // console.log("RESPONSE : ",response)
    // console.log("LENGTH : ",result.length)

    res.status(200).json({
        success:true,
        result
    })
})