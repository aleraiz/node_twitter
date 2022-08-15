const Tweet = require("../models/Tweet");
const User = require("../models/User");
const lodash = require("lodash");
const formidable = require("formidable");
const path = require("path");
const formatDistanceToNow = require("date-fns/formatDistanceToNow");
require("passport");

// Display a listing of the resource.
async function index(req, res) {
  const user = await User.findById(req.user.id).populate("tweets");
  const tweets = await Tweet.find({ author: req.params.id });
  if (user.id === req.params.id) {
    res.render("mainProfile", { user, tweets, formatDistanceToNow });
  } else {
    res.render("userProfile", { user, tweets, formatDistanceToNow });
  }
}

// Display the specified resource.
async function show(req, res) {
  const selectedUser = await User.findById(req.params.id).populate("tweets");
  const user = req.user;
  res.render("userProfile", { user, selectedUser, formatDistanceToNow });
}

// Show the form for creating a new resource
async function like(req, res) {
  const user = req.user;
  const tweet = await Tweet.findOne({ _id: `${req.params.id}` });
  console.log(tweet);
  if (!user.likes.includes(tweet.id)) {
    await Tweet.updateOne({ _id: `${req.params.id}` }, { $push: { likes: req.user.id } });
    await User.updateOne({ _id: `${req.user.id}` }, { $push: { likes: req.params.id } });
    console.log("se dio like");
  } else {
    await Tweet.updateOne({ _id: `${req.params.id}` }, { $pull: { likes: req.user.id } });
    await User.updateOne({ _id: `${req.user.id}` }, { $pull: { likes: req.params.id } });
    console.log("se quito like");
  }
  res.redirect("/");
}

// Store a newly created resource in storage.
async function store(req, res) {
  console.log(req.user);
  await Tweet.create({
    text: req.body.tweetContent,
    author: req.params.id,
    createdAt: new Date(),
    likes: [],
  });
  res.redirect("/");
}

async function followUnfollow(req, res) {
  const mainUser = req.user;
  const user = await User.findOne({ _id: req.params.id });

  if (!user.followers.includes(mainUser.id)) {
    await User.updateOne({ _id: user.id }, { $push: { followers: mainUser.id } });
    await User.updateOne({ _id: mainUser.id }, { $push: { following: user.id } });
    console.log("se dio follow");
  } else {
    await User.updateOne({ _id: user.id }, { $pull: { followers: mainUser.id } });
    await User.updateOne({ _id: mainUser.id }, { $pull: { following: user.id } });
    console.log("se quito follow");
  }
  res.redirect("/");
}

async function logout(req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/welcome");
  });
}

// Update the specified resource in storage.
async function showFollowers(req, res) {
  const user = await User.findById(req.user.id).populate("followers");
  res.render("viewFollowers", { user });
}

async function showFollowing(req, res) {
  const user = await User.findById(req.user.id).populate("following");
  res.render("viewFollowing", { user });
}
// Remove the specified resource from storage.
async function destroy(req, res) {
  await Tweet.deleteOne({ _id: req.params.id });
  await User.updateOne({ _id: req.user.id }, { $pull: { tweets: req.params.id } });

  res.redirect(`/user/mainProfile/${req.user.id}`);
}

// Otros handlers...
// ...
async function edit(req, res) {
  const user = await User.findOne({ _id: req.user.id });
  console.log(user);
  res.render(`editProfile`, { user });
}

async function update(req, res) {
  const form = formidable({
    multiples: true,
    uploadDir: path.join(__dirname, "../public/img"),
    keepExtensions: true,
  });
  form.parse(req, async (error, fields, files) => {
    await User.updateOne(
      { _id: req.user.id },
      {
        firstname: fields.firstname,
        lastname: fields.lastname,
        username: fields.username,
        description: fields.description,
        profileImg: files.profileImg.newFilename,
      },
    );
  });
  res.redirect(`/user/mainProfile/${req.user.id}`);
}

module.exports = {
  index,
  show,
  like,
  store,
  logout,
  followUnfollow,
  showFollowers,
  showFollowing,
  destroy,
  edit,
  update,
};
