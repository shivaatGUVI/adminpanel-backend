const express = require("express");
const OrderModel = require("../models/order.model");
const orderRoute = express.Router();

orderRoute.get("/:owner", async (req, res) => {
  const { page } = req.query;
  const { owner } = req.params;
  const pageSize = 6;
  try {
    const pageNumber = page || 1;
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const orderArray = await OrderModel.find({ owner });
    const order = orderArray.slice(startIndex, endIndex);

    const totalPages = Math.ceil(orderArray.length / 6);

    res.status(200).send({ array: order, totalPages });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

orderRoute.post("/add", async (req, res) => {
  const payload = req.body;
  try {
    const product = await OrderModel.findOne({
      owner: payload.owner,
      image_url: payload.image_url,
    });

    if (product) {
      await OrderModel.findByIdAndUpdate(
        { _id: product._id },
        { occurence: product.occurence + 1 }
      );
    } else {
      const newProduct = new OrderModel({ ...payload, occurence: 1 });
      await newProduct.save();
    }
    res.status(200).send({ message: "Product added" });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

module.exports = orderRoute;
