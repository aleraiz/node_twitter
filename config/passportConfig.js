const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
passport.use(
  new LocalStrategy({ usernameField: "emailOrAlias" }, async function (
    emailOrAlias,
    password,
    done,
  ) {
    console.log(emailOrAlias);
    const userByEmail = await User.findOne({ email: emailOrAlias });
    const userByAlias = await User.findOne({ username: emailOrAlias });
    if (!userByEmail && !userByAlias) {
      console.log("usuario inexistente");
      return done(null, false);
    }
    let verifyPassword;
    if (!userByEmail) {
      verifyPassword = await bcrypt.compare(password, userByAlias.password);
      if (!verifyPassword) {
        console.log("contraseña incorrecta");
        return done(null, false);
      }
      return done(null, userByAlias);
    } else {
      verifyPassword = await bcrypt.compare(password, userByEmail.password);
      if (!verifyPassword) {
        console.log("contraseña incorrecta");
        return done(null, false);
      }
      return done(null, userByEmail);
    }
  }),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
