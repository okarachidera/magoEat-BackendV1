import mongoose from 'mongoose';

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