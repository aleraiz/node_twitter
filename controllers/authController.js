const User = require("../models/User");
const bcrypt = require("bcryptjs");
const Tweet = require("../models/Tweet");
const jwt = require("jsonwebtoken");

async function verify(req, res) {
  const decoded = jwt.verify(req.body.token, process.env.JWT_SECRET);
  if (decoded.id && decoded.username) {
    res.json({ decoded });
  } else {
    res.json({ error: "token invalid" });
  }
}

// Otros handlers...
// ...

module.exports = {
  verify,
};
