const mongoose = require('mongoose')

const PdfSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,'Email is Required'],
    },
    path:{
        type:String,
        required:[true,'Pdf is Required']
    },
    filename:{
        type:String,
        required:[true,'File Name is Required'],
        maxLength: [40,"Name is Too Large"],
    }
})
PdfSchema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'filename',
    justOne: false
  });

module.exports = mongoose.model('Pdf',PdfSchema)