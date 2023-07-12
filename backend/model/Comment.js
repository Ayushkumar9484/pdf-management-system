const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    filename:{
        type: mongoose.Schema.ObjectId,
        ref: 'Pdf',
        required: true
    },
    comment:{
        type:String,
        default:'No Comment',
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports = mongoose.model('Comment',CommentSchema)