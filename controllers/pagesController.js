const User = require("../models/User");
const bcrypt = require("bcryptjs");
const Tweet = require("../models/Tweet");
const jwt = require("jsonwebtoken");

async function home(req, res) {
  const user = await User.findById(req.params.userId).populate("tweets");
  const tweets = [];
  const userTweet = await Tweet.find({ author: user.id })
    .sort({ createdAt: "descending" })
    .populate("author");
  tweets.push(...userTweet);
  for (let i = 0; i < user.following.length; i++) {
    let tweet = await Tweet.find({ author: user.following[i] })
      .sort({ createdAt: "descending" })
      .populate("author");
    tweets.push(...tweet);
  }
  res.json({ tweets, user });
  // console.log(user);
  // res.json({ user });
}

async function login(req, res) {
  console.log(req.query);
  const user = await User.findOne({
    // $or: [{ email: req.query.emailOrUsername }, { username: req.query.emailOrUsername }],
    $or: [{ email: req.params.emailOrUsername }, { username: req.params.emailOrUsername }],
  });
  if (!user) {
    res.json("usuario inexistente");
  }
  // const verifyPassword = await bcrypt.compare(req.query.password, user.password);
  const verifyPassword = await bcrypt.compare(req.params.password, user.password);

  if (!verifyPassword) {
    res.json("contraseña incorrecta");
  }
  const token = jwt.sign({ id: user.id, username: user.username }, "UnStringMuyScreto");

  res.json({ userId: user.id, userName: user.username, token });
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
  res.status(201).json("Usuario creado");
}

// Otros handlers...
// ...

module.exports = {
  welcome,
  store,
  home,
  error,
  login,
};
