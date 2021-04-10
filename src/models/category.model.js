const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const categorySchema = mongoose.Schema({
    label: {
        type: String,
        required: true,
        unique: true
    },
    imgWhite: {
        type: String,
        required: true
    },
    imgRed: {
        type: String,
        required: true
    },
    imgBrushed: {
        type: String,
        required: true
    },
    restaurants: [
        {
            restau: mongoose.Schema.Types.ObjectId
        }
    ],
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

categorySchema.plugin(uniqueValidator);

module.exports = mongoose.model("Category", categorySchema);