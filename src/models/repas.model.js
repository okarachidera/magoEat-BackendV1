const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const repasSchema = mongoose.Schema({
    label: {
        type: String,
        require: true
    },
    idRestau: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    imgUrl: {
        type: String,
        require: true
    },
    
})