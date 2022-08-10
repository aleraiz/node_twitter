const User = require("../models/User");
const bcrypt = require("bcryptjs");
require("../config/passportConfig");

async function home(req, res) {
  res.send("HOME");
}
async function welcome(req, res) {
  res.render("welcome");
}

// async function showLogin(req, res) {
//   res.render("login");
// }

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
};
