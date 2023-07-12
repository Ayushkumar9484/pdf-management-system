const express = require('express')
const colors = require('colors')
const auth = require("./routes/auth")
const dashboard = require("./routes/dashboard")
const pdf = require('./routes/pdf')
const comment = require('./routes/comment')
const errorHandler = require('./middleware/error')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

const connectToDB = async () =>{
    const conn = await mongoose.connect("mongodb+srv://9484ayush:Ayush9484@cluster0.vckjscu.mongodb.net/",{
        useNewUrlParser: true,
        useUnifiedTopology:true
    })
    console.log('MongoDB connected'.blue.underline.bold)
}
connectToDB()
app.use(cors())
const PORT = 5000

// Middleware to parse JSON request body and url parameters into req object for all routes in the application
app.use(express.json()) // To use json format data as input
app.use('/public',express.static('public'))
app.use("/api/v1/auth",auth)
app.use("/api/v1/dashboard",dashboard)
app.use("/api/v1/pdf",pdf)
app.use("/api/v1/comment",comment)
app.use(errorHandler)


const server = app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`.yellow.bold)
})