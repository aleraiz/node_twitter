const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
passport.use(
  new LocalStrategy({ usernameField: "emailOrUsername" }, async function (
    emailOrUsername,
    password,
    done,
  ) {
    console.log(emailOrUsername);
    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });
    if (!user) {
      console.log("usuario inexistente");
      return done(null, false);
    }
    const verifyPassword = await bcrypt.compare(password, user.password);

    if (!verifyPassword) {
      console.log("contraseña incorrecta");
      return done(null, false);
    }

    return done(null, user);
  }),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
