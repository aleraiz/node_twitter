const passport = require("passport");

module.exports = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/welcome",
  failureFlash: true,
});
