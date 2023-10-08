const express = require("express");
const CategoryModel = require("../models/category.model");

const categoryRoute = express.Router();

categoryRoute.get("/:owner", async (req, res) => {
  const { owner } = req.params;
  try {
    const category = await CategoryModel.find({ owner });
    res.status(200).send(category);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

categoryRoute.post("/add", async (req, res) => {
  const payload = req.body;
  try {
    const newCategory = new CategoryModel(payload);
    await newCategory.save();
    res.status(200).send({ message: "Category added" });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

categoryRoute.delete("/delete/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    await CategoryModel.findByIdAndDelete({ _id });
    res.status(200).send({ message: "Category deleted" });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

module.exports = categoryRoute;
