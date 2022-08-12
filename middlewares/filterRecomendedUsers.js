const { User } = require("../models/User");
const lodash = require("lodash");
require("../config/passportConfig");

let recomendedUsers;
async function recomended() {
  const user = await User.findbyId();
  const otherUsers = [];
  otherUsers.push(await User.find({ _id: { $ne: user.id } }));
  const usersFollowed = user.following;
  const allRecomendedUsers = lodash.difference(otherUsers, usersFollowed);
  recomendedUsers = lodash.sampleSize(allRecomendedUsers[0], 3);
}
recomended();

module.exports = recomendedUsers;
