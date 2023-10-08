const express = require("express");
const CartModel = require("../models/cart.model");
const cartRoute = express.Router();

cartRoute.get("/:owner", async (req, res) => {
  const { page } = req.query;
  const { owner } = req.params;
  const pageSize = 6;
  try {
    const pageNumber = page || 1;
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const cartArray = await CartModel.find({owner});
    const cart = cartArray.slice(startIndex, endIndex);

    console.log(cart, cartArray);

    const totalPages = Math.ceil(cartArray.length / 6);

    res.status(200).send({ array: cart, totalPages });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

cartRoute.post("/add", async (req, res) => {
  const payload = req.body;
  try {
    const product = await CartModel.findOne({
      owner: payload.owner,
      image_url: payload.image_url,
    });

    if (product) {
      await CartModel.findByIdAndUpdate(
        { _id: product._id },
        { occurence: product.occurence + 1 }
      );
    } else {
      const newProduct = new CartModel({ ...payload, occurence: 1 });
      await newProduct.save();
    }
    res.status(200).send({ message: "Product added" });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

module.exports = cartRoute;
