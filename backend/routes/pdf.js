const express = require('express')
const multer = require('multer')
const {
    savepdf
} = require('../controllers/pdf')
const router = express.Router()
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/pdf')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '_' + file.originalname)
    }
  })
  
const upload = multer({ storage: storage })
router
    .route("/save")
    .post(upload.single('mypdf'),savepdf)

module.exports = router