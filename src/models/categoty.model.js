const mongoose = require("mongoose");
// const uniqueValidator = require('mongoose-unique-validator')

const categorySchema = mongoose.Schema({
    label : {
        type : String,
        required : true
    },
    imgCroped : {
        type : String,
        required : true
    },
    imgBrushed: {
        type : String,
        required : true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Order", categorySchema);