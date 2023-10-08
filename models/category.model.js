const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    owner: String,
    title: String,
  },
  { versionKey: false }
);

const CategoryModel = mongoose.model("category", categorySchema);

module.exports = CategoryModel;
