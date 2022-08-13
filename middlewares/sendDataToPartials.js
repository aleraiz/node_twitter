const User = require("../models/User");
const lodash = require("lodash");

module.exports = async () => {
  const user = await User.findById(req.user.id);

  const otherUsers = await User.find({ _id: { $ne: user.id } }, `id`);
  const otherUsersId = [];
  for (let i = 0; i < otherUsers.length; i++) {
    otherUsersId.push(otherUsers[i]._id);
  }
  const usersFollowed = user.following;
  const allRecomendedUsers = otherUsersId.filter((x) => !usersFollowed.includes(x));
  const recomendedUsersId = lodash.sampleSize(allRecomendedUsers, 3);
  const recomendedUsers = [];
  for (let i = 0; i < recomendedUsersId.length; i++) {
    recomendedUsers.push(await User.findById(recomendedUsersId[i]));
  }
  return recomendedUsers;
};
