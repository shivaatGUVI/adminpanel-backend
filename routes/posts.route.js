const express = require("express");
const PostModel = require("../models/post.model");
const authorizeMiddleware = require("../middlewares/authorize.middleware");
const postRoute = express.Router();

postRoute.get("/:owner", async (req, res) => {
  const { owner } = req.params;
  const { page, category } = req.query;
  const pageSize = 6;
  try {
    const pageNumber = page || 1;
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const postsArray = await PostModel.find({ owner, category });
    const posts = postsArray.slice(startIndex, endIndex);

    const totalPages = Math.ceil(postsArray.length / 6);

    res.status(200).send({ array: posts, totalPages });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

postRoute.post("/add", authorizeMiddleware, async (req, res) => {
  const payload = req.body;
  try {
    const newPost = new PostModel(payload);
    await newPost.save();
    res.status(200).send({ message: "Post added successfull" });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

postRoute.patch("/update/:_id", authorizeMiddleware, async (req, res) => {
  const { _id } = req.params;
  const payload = req.body;
  try {
    await PostModel.findByIdAndUpdate({ _id }, payload);
    res.status(200).send({ message: "Post updated" });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

postRoute.delete("/delete/:_id", authorizeMiddleware, async (req, res) => {
  const { _id } = req.params;
  try {
    await PostModel.findByIdAndDelete({ _id });
    res.status(200).send({ message: "Post deleted" });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

module.exports = postRoute;
