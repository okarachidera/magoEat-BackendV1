const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const restaurantSchema = mongoose.Schema({
    label: {
        type : String,
        required : true,
        unique : true
    },
    adress: {
        type: String,
        required: false
    },
    isActive: {
        type: Boolean,
        required: false
    },
    description: {
        type : String,
        required : true
    },
    imgUrl: {
        type : String,
        required : false
    },
    ownerId: {
        type : String,
        required : true,
        unique : false
    },
    averageRating: {
        type : Number,
        required : false,
        unique : false
    },
    opensAt: {
        type: String,
        required: false
    },
    closeAt: {
        type: String,
        required: false
    }
})

restaurantSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Restau', restaurantSchema);
