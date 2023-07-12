const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true,"Please add a name"]
    },
    email:{
        type :String ,
        required  :[ true,'Email is Required'],
        unique   : [true,'This Email already exists'],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: [6, 'Password must be at least 6 characters'],
        select: false
    }
})

// Encrypt password using bcrypt
UserSchema.pre('save', async function(next){
    // console.log('encrypting password')
    const salt = await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password, salt);
})

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, "3425876971357347642767685767", {
        expiresIn: 30*24*60*60*1000
    })
}

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model("User",UserSchema)