const User = require("../models/User");
const lodash = require("lodash");
require("../config/passportConfig");

module.exports = async (req, res, next) => {
  const mainUser = await User.findById(req.user.id);

  const otherUsers = await User.find({ _id: { $ne: mainUser.id } }, `id`);
  const otherUsersId = [];
  for (let i = 0; i < otherUsers.length; i++) {
    otherUsersId.push(otherUsers[i]._id);
  }
  const usersFollowed = mainUser.following;
  const allRecomendedUsers = otherUsersId.filter((x) => !usersFollowed.includes(x));
  const recomendedUsersId = lodash.sampleSize(allRecomendedUsers, 3);
  const recomendedUsers = [];
  for (let i = 0; i < recomendedUsersId.length; i++) {
    recomendedUsers.push(await User.findById(recomendedUsersId[i]));
  }
  res.locals.recomendedUsers = recomendedUsers;
  next();
};
