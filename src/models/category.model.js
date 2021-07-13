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
  repas: [
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
  ]
}, {
  timestamps: true
});

categorySchema.plugin(uniqueValidator);

module.exports = mongoose.model("Category", categorySchema);
