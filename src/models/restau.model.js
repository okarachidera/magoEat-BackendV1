const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

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
    imgBrushed: {
        type: String,
        required: false
    },
    owner: {
        type : mongoose.Schema.Types.ObjectId,
        required: true,
        unique: false,
        ref: "User"
    },
    feedback: [
        {
            type: String,
            required: false
        }
    ],
    averageRate: {
        type: Number,
        required: false,
        unique: false
    },
    opensAt: {
        type: Date,
        required: false
    },
    closeAt: {
        type: Date,
        required: false
    }
}, {
    timestamps: true
});

restaurantSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Restau", restaurantSchema);
