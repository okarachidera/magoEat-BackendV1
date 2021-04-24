const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true, 
        unique: true
    },
    avatar: {
        type: String,
        required: false
    },
    password: {
        type: String, 
        required: true
    },
    mail: {
        type: String, 
        required: true, 
        unique: true
    },
    phone: {
        type: Number,
        unique: true
    },
    favoriteRestaurants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Restau"
        }
    ],
    favoriteRepas: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Repas"
        }
    ],
    restaurants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Restau"
        }
    ],
    msgCode: {
        type: String
    },
    role: {
        type: String,
        required: false,
        unique: false
    },
    verified: {
        type: Boolean,
        required: true
    },
    isAuthentcated: Boolean,
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order"
        }
    ]
}, {
    timestamps: true
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);