const User = require("../models/User");
const bcrypt = require("bcryptjs");
const Tweet = require("../models/Tweet");
const formatDistanceToNow = require("date-fns/formatDistanceToNow");
require("../config/passportConfig");

async function home(req, res) {
  const tweets = await Tweet.find().sort({ createdAt: "descending" }).populate("author");
  const user = await User.findById(req.user.id);
  res.render("home", { tweets, user, formatDistanceToNow });
}
async function welcome(req, res) {
  res.render("welcome");
}

async function error(req, res) {
  res.render("enConstruccion");
}

// async function showRegister(req, res) {
//   res.render("register");
// }

async function store(req, res) {
  const passwordHash = await bcrypt.hash(req.body.password, 10);
  await User.create({ ...req.body, password: passwordHash });
  res.redirect("/welcome");
}

// Otros handlers...
// ...

module.exports = {
  welcome,
  store,
  home,
  error,
};
