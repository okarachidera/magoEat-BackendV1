const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const subCategorySchema = mongoose.Schema({
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

subCategorySchema.plugin(uniqueValidator);

module.exports = mongoose.model("SubCategory", subCategorySchema);
