require("dotenv").config();

const cors = require("cors");
const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
const seeder = require("./seeders/seeder");

// const dbInitialSetup = require("./dbInitialSetup");
const APP_PORT = process.env.APP_PORT || 8000;
const app = express();
mongoose.connect(process.env.DB_CONNECTION_STRING);

app.use(cors());
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// seeder();

routes(app);

app.listen(APP_PORT, () => {
  console.log(`\n[Express] Servidor corriendo en el puerto ${APP_PORT}.`);
  console.log(`[Express] Ingresar a http://localhost:${APP_PORT}.\n`);
});
