const express = require('express')
const { 
    Savecomment, 
    getComment
} = require('../controllers/comment')
const router = express.Router()

router
    .route("/save")
    .post(Savecomment)

router
    .route("/Allcomments")
    .post(getComment)

module.exports = router