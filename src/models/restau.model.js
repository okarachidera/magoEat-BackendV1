import mongoose from 'mongoose';
const uniqueValidator = require('mongoose-unique-validator');

const restaurantSchema = mongoose.Schema({
    // a restaurant has to have a label, description, logo (an image url) 
    label : {
        type : String,
        required : true,
        unique : true
    },
    description : {
        type : String,
        required : true
    },
    imgUrl : {
        type : String,
        required : false
    },
    owner : {
        type : String,
        required : true,
        unique : false
    },
    averageRating : {
        type : Number,
        required : false,
        unique : false
    }
})

restaurantSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Restau', restaurantSchema);
