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
    category: {
        type: String,
        required: true
    },
    subCategory: {
        type: String,
        required: false
    },
    timeForCook: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    charge: {
        type: Number,
        required: true
    },
    averageRate: {
        type: [Number],
        required: false
    }
})

repasSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Repas', repasSchema);