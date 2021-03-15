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
    restaurants: [
        {idRestau: String, label: String, img: String}
    ],
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Order", categorySchema);