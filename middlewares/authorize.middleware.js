const jwt = require("jsonwebtoken");

const authorizeMiddleware = async (req, res, next) => {
  const payload = req.body;
  const token = req.headers.authorization;
  try {
    jwt.verify(token, "superadmin", function (err, decoded) {
      if (err) {
        res.status(400).send({ error: err.message });
      } else {
        payload.user = decoded.user;
        next();
      }
    });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

module.exports = authorizeMiddleware;
