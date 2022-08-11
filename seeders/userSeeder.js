const { faker } = require("@faker-js/faker");
const User = require("../models/User");
const lodash = require("lodash");

module.exports = async () => {
  const users = [];

  //Aca creamos 10 users
  for (let index = 1; index <= 10; index++) {
    const user = new User({
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      username: faker.name.prefix() + " " + faker.name.middleName(),
      email: faker.internet.email(),
      password: "12345",
      description: faker.lorem.sentence(10),
      tweets: [],
      followers: [],
      following: [],
      likes: [],
    });
    await users.push(user);
  }
  //   console.log(users);

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
  User.deleteMany({}, function () {
    console.log("Success");
  });

  User.collection.insertMany(users, (error, docs) => {
    if (!error) {
      console.log(docs);
    }
    console.log(error);
  });
};
