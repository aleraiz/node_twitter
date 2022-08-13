require("dotenv").config();

const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const methodOverride = require("method-override");
const Seeder = require("./seeders/Seeder");

// const dbInitialSetup = require("./dbInitialSetup");
const APP_PORT = process.env.APP_PORT || 3000;
const app = express();
mongoose.connect(process.env.DB_CONNECTION_STRING);
app.use(
  session({
    secret: process.env.APP_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.session());

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.locals.user = req.user;
  res.locals.url = req.url;
  next();
});
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
require("./config/passportConfig");

// Seeder();

routes(app);

app.listen(APP_PORT, () => {
  console.log(`\n[Express] Servidor corriendo en el puerto ${APP_PORT}.`);
  console.log(`[Express] Ingresar a http://localhost:${APP_PORT}.\n`);
});
