const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");

userRouter.post("/tweet/:id", userController.store);

module.exports = userRouter;
