const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const repasSchema = mongoose.Schema({
    label: {
        type: String,
        require: true,
        unique: true
    },
    restau: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restau",
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
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    subCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory",
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
    devise: {
        type: Number,
        default: "USD",
        required: true
    },
    charge: {
        type: Number,
        required: true
    },
    rates: {
        type: [Number],
        required: false,
        default: [0]
    },
    coupon: {
        type: Number,
        required: false,
        default: 0
    }
}, {
    timestamps: true
});

repasSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Repas", repasSchema);