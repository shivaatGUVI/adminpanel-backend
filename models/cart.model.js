const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
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

const CartModel = mongoose.model("cart", cartSchema);

module.exports = CartModel;
