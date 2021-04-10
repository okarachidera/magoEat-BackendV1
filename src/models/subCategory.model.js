const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const categorySchema = mongoose.Schema({
    label: {
        type: String,
        required: true,
        unique: true
    },
    imgCroped: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

categorySchema.plugin(uniqueValidator);

module.exports = mongoose.model("Category", categorySchema);
