const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// to set an enum for the roles

const userSchema = mongoose.Schema({
    username : {
        type : String, 
        required : true, 
        unique : true
    },
    avatar: {
        type: String,
        required: false
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
    },
    updated: {
        type: Date,
        default: Date.now
    },
    isAuthentcated: Boolean
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);