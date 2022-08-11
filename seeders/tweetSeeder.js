const { faker } = require("@faker-js/faker");
const Tweet = require("../models/Tweet");
const User = require("../models/User");

faker.locale = "es";

module.exports = async () => {
  const tweets = [];

  for (let i = 1; i <= 10; i++) {
    // Get the count of all users

    // Get a random entry
    let random = Math.floor(Math.random() * 10);
    // Again query all users but only fetch one offset by our random #
    let user = await User.findOne().skip(random);
    // console.log(user);
    const tweet = new Tweet({
      text: faker.lorem.sentence(20),
      author: { _id: user.id },
      createdAt: faker.date.past(),
      likes: [],
    });
    await tweets.push(tweet);
  }
  // Tweet.deleteMany({}, function () {
  //   console.log("Success");
  // });
  Tweet.collection.insertMany(tweets, (error, docs) => {
    if (!error) {
      console.log(docs);
    }
    console.log(error);
  });
  console.log("OK");
};
