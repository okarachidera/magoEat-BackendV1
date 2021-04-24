const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const repasSchema = mongoose.Schema({
    label: {
        type: String,
        require: true,
    },
    restau: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restau",
    },
    description: {
        type: String,
        require: true
    },
    imgUrl: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
    featuredUsers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    subCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory"
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
        type: String,
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
    },
    tags: [
        {
            type: [String],
        }
    ]
}, {
    timestamps: true
});

repasSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Repas", repasSchema);