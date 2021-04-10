const mongoose = require("mongoose");
// const uniqueValidator = require('mongoose-unique-validator')

const orderSchema = mongoose.Schema({
    idUser: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    plat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Repas",
        required: true
    },
    rate: {
        type: Number,
        required: false
    },
    ratable: {
        type: Boolean,
        required: true
    },
    feedBack: [
        {
            body: String,
            date: Date
        }
    ],
    amount: {
        type: Number,
        required: true
    },
    devise: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    cancelReason: {
        type: String,
        required: false
    },
    restau: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restau",
        require: false
    },
    closedAt: {
        type: Date,
        required: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Order", orderSchema);
