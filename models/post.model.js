const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    owner: String,
    image_url: String,
    brand: String,
    category: String,
    description: String,
    price: Number,
  },
  { versionKey: false }
);

const PostModel = mongoose.model("post", postSchema);

module.exports = PostModel;
