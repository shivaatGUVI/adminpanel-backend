const express = require("express");
const LikeModel = require("../models/like.model");
const likeRoute = express.Router();

likeRoute.get("/:owner", async (req, res) => {
  const { page } = req.query;
  const { owner } = req.params;
  const pageSize = 6;
  try {
    const pageNumber = page || 1;
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const likeArray = await LikeModel.find({ owner });
    const like = likeArray.slice(startIndex, endIndex);

    const totalPages = Math.ceil(likeArray.length / 6);

    res.status(200).send({ array: like, totalPages });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

likeRoute.post("/add", async (req, res) => {
  const payload = req.body;
  try {
    const product = await LikeModel.findOne({
      owner: payload.owner,
      image_url: payload.image_url,
    });

    if (product) {
      await LikeModel.findByIdAndUpdate(
        { _id: product._id },
        { occurence: product.occurence + 1 }
      );
    } else {
      const newProduct = new LikeModel({ ...payload, occurence: 1 });
      await newProduct.save();
    }
    res.status(200).send({ message: "Product added" });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

module.exports = likeRoute;
