const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");
const verifyNoAuth = require("../middlewares/verifyNoAuthenticated");
const recomendedUsers = require("../middlewares/sendDataToPartials");

userRouter.use(verifyNoAuth);
userRouter.post("/tweet/:id", userController.store);
userRouter.post("/tweetLike/:id", userController.like);
userRouter.delete("/", userController.logout);

userRouter.get("/profile/:id", recomendedUsers, userController.show);
userRouter.get("/mainProfile/:id", recomendedUsers, userController.index);
userRouter.get("/mainProfile/:id/followers", recomendedUsers, userController.showFollowers);
userRouter.get("/mainProfile/:id/following", recomendedUsers, userController.showFollowing);
userRouter.get("/mainProfile/:id/edit", recomendedUsers, userController.edit);
userRouter.patch("/mainProfile/:id/edit", userController.update);

userRouter.post("/profile/:id", userController.followUnfollow);

userRouter.delete("/mainProfile/:id", userController.destroy);

module.exports = userRouter;
