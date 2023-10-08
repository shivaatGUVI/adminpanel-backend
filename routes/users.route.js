const express = require("express");
const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRoute = express.Router();

userRoute.post("/register", async (req, res) => {
  const payload = req.body;
  try {
    const User = await UserModel.findOne({ email: payload.email });

    if (User) {
      res.status(200).send({ message: "Email already exists" });
    } else {
      bcrypt.hash(payload.password, 3, async function (err, hash) {
        if (err) {
          res.status(400).send({ error: err.message });
        } else {
          const newUser = new UserModel({ ...payload, password: hash });
          await newUser.save();
          res.status(200).send({ message: "User registered successfully" });
        }
      });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

userRoute.post("/login", async (req, res) => {
  const payload = req.body;
  try {
    const User = await UserModel.findOne({ email: payload.email });

    if (User) {
      bcrypt.compare(payload.password, User.password, function (err, result) {
        if (err) {
          res.status(400).send({ error: err.message });
        } else {
          res.status(200).send({
            message: "Login successful",
            user: { id: User._id, name: User.name, email: User.email },
            token: jwt.sign(
              {
                user: User._id,
              },
              "superadmin",
              { expiresIn: "1h" }
            ),
          });
        }
      });
    } else {
      res.status(400).send({ message: "User not found" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

module.exports = userRoute;
