const Tweet = require("../models/Tweet");
require("passport");

// Display a listing of the resource.
async function index(req, res) {}

// Display the specified resource.
async function show(req, res) {}

// Show the form for creating a new resource
async function create(req, res) {}

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

async function logout(req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/welcome");
  });
}

// Update the specified resource in storage.
async function update(req, res) {}

// Remove the specified resource from storage.
async function destroy(req, res) {}

// Otros handlers...
// ...

module.exports = {
  // index,
  // show,
  // create,
  store,
  logout,
  // edit,
  // update,
  // destroy,
};
