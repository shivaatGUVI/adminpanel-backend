const express = require("express");
const cors = require("cors");
const connection = require("./config/db");
const userRoute = require("./routes/users.route");
const postRoute = require("./routes/posts.route");
const likeRoute = require("./routes/like.route");
const orderRoute = require("./routes/order.route");
const cartRoute = require("./routes/cart.route");
const categoryRoute = require("./routes/category.route");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/user", userRoute);
app.use("/post", postRoute);
app.use("/like", likeRoute);
app.use("/order", orderRoute);
app.use("/cart", cartRoute);
app.use("/category", categoryRoute);

app.listen(process.env.PORT, async () => {
  console.log("Server started");
  try {
    await connection;
    console.log("Mongo DB started");
  } catch (err) {
    console.log({ error: err.message });
  }
});
