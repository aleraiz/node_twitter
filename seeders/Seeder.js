const { faker } = require("@faker-js/faker");
const User = require("../models/User");
const lodash = require("lodash");
const Tweet = require("../models/Tweet");

module.exports = async () => {
  const users = [];

  //Aca creamos 10 users
  for (let index = 1; index <= 10; index++) {
    const user = new User({
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      //faker.internet.userName
      username: faker.name.prefix() + " " + faker.name.middleName(),
      email: faker.internet.email(),
      password: "12345",
      description: faker.lorem.sentence(10),
      tweets: [],
      followers: [],
      following: [],
      likes: [],
    });
    users.push(user);
  }

  // Agregamos followers y followings  a los usuarios
  for (let i = 0; i < users.length; i++) {
    // console.log(users[i]);
    let allUsers = [...users]; // array con todos los usuarios
    allUsers.slice(i, 1); // array con todos los usuarios menos el que estamos
    let chosenUsers = lodash.sampleSize(allUsers, lodash.random(0, 9)); // agarra de 0 a 9 usuarios cualquiera dentro de allUsers

    for (let j = 0; j < chosenUsers.length; j++) {
      if (users[i].id !== chosenUsers[j].id) {
        users[i].followers.push(chosenUsers[j].id);
        chosenUsers[j].following.push(users[i].id);
      }
    }
  }
  const tweets = [];

  for (let i = 1; i <= 10; i++) {
    // Again query all users but only fetch one offset by our random #
    let user = lodash.sample(users);

    const tweet = new Tweet({
      text: faker.lorem.sentence(20),
      author: { _id: user.id },
      createdAt: faker.date.past(),
      likes: [],
    });

    tweets.push(tweet);

    user.tweets.push(tweet.id);
  }

  for (let i = 1; i <= 10; i++) {
    let user = lodash.sample(users);
    let tweet = lodash.sample(tweets);
    if (!user.tweets.includes(tweet.id) && !user.likes.includes(tweet.id)) {
      user.likes.push(tweet.id);
      tweet.likes.push(user.id);
    }
  }

  Tweet.deleteMany({}, function () {
    console.log("Success tweet");
  });
  console.log("OK");
  User.deleteMany({}, function () {
    console.log("Success user");
  });

  User.collection.insertMany(users, (error, docs) => {
    if (!error) {
      console.log(docs);
    }
    console.log(error);
  });
  Tweet.collection.insertMany(tweets, (error, docs) => {
    if (!error) {
      console.log(docs);
    }
    console.log(error);
  });
};
