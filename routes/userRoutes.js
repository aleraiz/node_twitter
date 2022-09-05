const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");
// const verifyNoAuth = require("../middlewares/verifyNoAuthenticated");
const recomendedUsers = require("../middlewares/sendDataToPartials");

// userRouter.use(verifyNoAuth);
userRouter.post("/tweet/:id", userController.store);
userRouter.post("/tweetLike/:id", userController.like);
userRouter.delete("/", userController.logout);

userRouter.get("/:id", recomendedUsers, userController.user);
userRouter.get("/avatar/:id", recomendedUsers, userController.avatar);
userRouter.get("/tweets/:userId", recomendedUsers, userController.userTweets);
userRouter.get("/recomended/:userId", recomendedUsers, userController.userRecomended);
userRouter.get("/following/:userId", recomendedUsers, userController.following);
userRouter.get("/followers/:userId", recomendedUsers, userController.followers);
userRouter.get("/followingTweets/:userId", recomendedUsers, userController.followingTweets);

userRouter.get("/profile/:id", recomendedUsers, userController.show);
userRouter.get("/mainProfile/:id", recomendedUsers, userController.index);

userRouter.get("/mainProfile/:id/edit", recomendedUsers, userController.edit);
userRouter.patch("/mainProfile/:id/edit", userController.update);

userRouter.post("/profile/:id", userController.followUnfollow);

userRouter.delete("/mainProfile/:tweetId", userController.destroy);

module.exports = userRouter;
