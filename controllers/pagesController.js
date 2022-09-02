const User = require("../models/User");
const bcrypt = require("bcryptjs");
const Tweet = require("../models/Tweet");
const jwt = require("jsonwebtoken");

async function login(req, res) {
  const user = await User.findOne({
    $or: [{ email: req.body.emailOrUsername }, { username: req.body.emailOrUsername }],
  });
  console.log({ user });
  if (!user) {
    return res.json({ message: "credenciales invalidas" });
  } else {
    const verifyPassword = await bcrypt.compare(req.body.password.toString(), user.password);

    if (!verifyPassword) {
      return res.json({ message: "credenciales invalidas" });
    }
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET);
    return res.json({ userId: user.id, userName: user.username, token });
  }
}

async function welcome(req, res) {
  // res.json("welcome");
  res.render("welcome");
}

async function error(req, res) {
  res.json("enConstruccion");
}

async function store(req, res) {
  console.log(req.body);
  // console.log(req);
  const passwordHash = await bcrypt.hash(req.body.password, 10);
  await User.create({ ...req.body, password: passwordHash });
  res.status(201).json({ message: "Usuario creado" });
}

// Otros handlers...
// ...

module.exports = {
  welcome,
  store,
  // home,
  error,
  login,
};
