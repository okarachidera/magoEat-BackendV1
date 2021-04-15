const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    date: {
        type: Date,
        required: true
    },
    repas: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Repas",
    },
    rate: {
        type: Number,
        required: false
    },
    quanity: {
        type: Number,
        default: 1
    },
    feedBack: {
        body: {
            type: String
        },
        date: {
            type: Number,
            default: Date.now()
        }
    },
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
    closedAt: {
        type: Date,
        required: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Order", orderSchema);
