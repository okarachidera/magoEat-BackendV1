const mongoose = require('mongoose')
// const uniqueValidator = require('mongoose-unique-validator')

const orderSchema = mongoose.Schema({
    idUser : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        required : true
    },
    platId: {
        type : String,
        required : true
    },
    restauName : {
        type : String,
        required : true
    },
    rate : {
        type : Number,
        required : false
    },
    ratable : {
        type : Boolean,
        required : true
    },
    feedBack : {
        type : String,
        required : false
    },
    amount: {
        type: Number,
        required: true
    },
    devise: {
        type: Boolean,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    cancelReason: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Order', orderSchema)