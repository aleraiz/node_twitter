const User = require("../models/User");
const bcrypt = require("bcryptjs");
const Tweet = require("../models/Tweet");
const formatDistanceToNow = require("date-fns/formatDistanceToNow");
const lodash = require("lodash");
require("../config/passportConfig");

async function home(req, res) {
  const user = await User.findById(req.user.id);
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

  // const otherUsers = await User.find({ _id: { $ne: user.id } }, `id`);
  // const otherUsersId = [];
  // for (let i = 0; i < otherUsers.length; i++) {
  //   otherUsersId.push(otherUsers[i]._id);
  // }
  // const usersFollowed = user.following;
  // const allRecomendedUsers = otherUsersId.filter((x) => !usersFollowed.includes(x));
  // const recomendedUsersId = lodash.sampleSize(allRecomendedUsers, 3);
  // const recomendedUsers = [];
  // for (let i = 0; i < recomendedUsersId.length; i++) {
  //   recomendedUsers.push(await User.findById(recomendedUsersId[i]));
  // }

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
