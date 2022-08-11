const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");
const verifyNoAuth = require("../middlewares/verifyNoAuthenticated");

userRouter.post("/tweet/:id", verifyNoAuth, userController.store);
userRouter.delete("/", verifyNoAuth, userController.logout);

module.exports = userRouter;
