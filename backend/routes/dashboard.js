const express = require('express')
const {
    dashboard
} = require('../controllers/dashboard')
const router = express.Router()

router
    .route("/")
    .post(dashboard)

module.exports = router