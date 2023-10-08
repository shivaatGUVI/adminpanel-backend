const mongoose = require("mongoose");

const likeSchema = mongoose.Schema(
  {
    owner: String,
    image_url: String,
    brand: String,
    category: String,
    description: String,
    price: Number,
    occurence: Number,
  },
  { versionKey: false }
);

const LikeModel = mongoose.model("like", likeSchema);

module.exports = LikeModel;
