const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/authController");

// Rutas del Admin:
// ...
authRouter.post("/verifyToken", authController.verify);

module.exports = authRouter;
