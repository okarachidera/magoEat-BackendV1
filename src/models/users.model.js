const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

// to set an enum for the roles

const userSchema = mongoose.Schema({
    username : {
        type : String, 
        required : true, 
        unique : true
    },
    password : {
        type : String, 
        required : true
    },
    mail : {
        type : String, 
        required : true, 
        unique : true
    },
    // adress : {
    //     type : String,
    // }, 
    phone : {
        type : Number,
        unique : true
    },
    msgCode : {
        type : String
    },
    role : {
        type : String,
        required : false,
        unique : false
    },
    verified: {
        type: Boolean,
        required: true
    }
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)