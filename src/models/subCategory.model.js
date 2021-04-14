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
    },
    repas: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Repas"
        }
    ]
}, {
    timestamps: true
});

subCategorySchema.plugin(uniqueValidator);

module.exports = mongoose.model("SubCategory", subCategorySchema);
