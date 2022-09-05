const Tweet = require("../models/Tweet");
const User = require("../models/User");
const lodash = require("lodash");
const formidable = require("formidable");
const path = require("path");

async function user(req, res) {
  // console.log(req.params.id);
  const user = await User.find(
    { _id: req.params.id },
    "firstname lastname username email profileImg tweets following followers likes",
  );
  // console.log(user);
  res.json({ user });
}

async function followingTweets(req, res) {
  const user = await User.findById(req.params.id);
  const tweets = [];
  for (let i = 0; i < user.following.length; i++) {
    let tweet = await Tweet.find({ author: user.following[i] })
      .sort({ createdAt: "descending" })
      .populate("author");
    tweets.push(tweet);
  }
  res.json({ tweets });
}

async function userTweets(req, res) {
  const tweets = await Tweet.find({ author: req.params.userId });
  res.json({ tweets });
}

async function userRecomended(req, res) {
  // console.log(req.params);
  const mainUser = await User.findById(req.params.userId);
  // res.json({ mainUser });
  const otherUsers = await User.find({ _id: { $ne: mainUser.id } }, `id`);
  // res.json({ otherUsers });
  // const otherUsersId = [];
  // for (let i = 0; i < otherUsers.length; i++) {
  //   otherUsersId.push(otherUsers[i]._id);
  // }
  const usersFollowed = mainUser.following;
  const allRecomendedUsers = otherUsers.filter((x) => !usersFollowed.includes(x.id));
  // res.json({ allRecomendedUsers });
  const recomendedUsersId = lodash.sampleSize(allRecomendedUsers, 3);
  const recomendedUsers = [];
  for (let i = 0; i < recomendedUsersId.length; i++) {
    recomendedUsers.push(await User.findById(recomendedUsersId[i]));
  }
  res.json({ recomendedUsers });
}

// Display a listing of the resource.
async function index(req, res) {
  const user = await User.findById(req.params.id).populate("tweets");
  const tweets = await Tweet.find({ author: req.params.id });
  if (user.id === req.params.id) {
    res.json({ user, tweets });
  } else {
    res.json({ user, tweets });
  }
}

// Display the specified resource.
async function show(req, res) {
  const selectedUser = await User.findById(req.params.id).populate("tweets");
  const user = req.user;
  res.json({ user, selectedUser });
}

// Show the form for creating a new resource
async function like(req, res) {
  const user = req.user;
  const tweet = await Tweet.findOne({ _id: `${req.params.id}` });
  console.log(tweet);
  if (!user.likes.includes(tweet.id)) {
    await Tweet.updateOne({ _id: `${req.params.id}` }, { $push: { likes: req.body.user.id } });
    await User.updateOne({ _id: `${req.body.user.id}` }, { $push: { likes: req.params.id } });
    console.log("se dio like");
  } else {
    await Tweet.updateOne({ _id: `${req.params.id}` }, { $pull: { likes: req.body.user.id } });
    await User.updateOne({ _id: `${req.body.user.id}` }, { $pull: { likes: req.params.id } });
    console.log("se quito like");
  }
  res.status(201);
}

// Store a newly created resource in storage.
async function store(req, res) {
  const newTweet = await Tweet.create({
    text: req.body.tweetContent,
    author: req.params.id,
    createdAt: new Date(),
    likes: [],
  });

  await User.updateOne({ _id: `${req.params.id}` }, { $push: { tweets: newTweet.id } });
  res.status(201);
}

async function followUnfollow(req, res) {
  const mainUser = await User.findById(req.body.user.id);
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
  res.status(201);
}

async function logout(req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.status(201);
  });
}

// Update the specified resource in storage.
async function followers(req, res) {
  const user = await User.findById(req.params.id, "followers").populate("followers");
  res.json({ user });
}

async function following(req, res) {
  const user = await User.findById(req.params.id, "following").populate("following");
  res.json({ user });
}
// Remove the specified resource from storage.
async function destroy(req, res) {
  await Tweet.deleteOne({ _id: req.params.tweetId });
  await User.updateOne({ _id: req.body.user.id }, { $pull: { tweets: req.params.tweeetId } });

  res.status(201);
}

// Otros handlers...
// ...
async function edit(req, res) {
  const user = await User.findOne({ _id: req.params.id });
  console.log(user);
  res.json({ user });
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
  res.status(201);
}

async function avatar(req, res) {
  const avatar = await User.find({ _id: req.params.id }, "profileImg");
  res.json({ avatar });
}

module.exports = {
  index,
  show,
  like,
  store,
  logout,
  followUnfollow,
  followers,
  following,
  destroy,
  edit,
  update,
  user,
  followingTweets,
  userTweets,
  userRecomended,
  avatar,
};
