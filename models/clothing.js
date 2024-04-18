const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clothingSchema = new Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
      required: true,
    },
    Price: {
      type: Number,
      required: true,
    },
    Stock: {
      type: Number,
      required: true,
    },
    Sizes: [String],
    Colors: [String],
    Reviews: [
      {
        ID_review: String,
        ID_user: String,
        Rating: Number,
        Comment: String,
      },
    ],
  },
  { timestamps: true }
);

const Clothing = mongoose.model("Clothes", clothingSchema);

module.exports = Clothing;
