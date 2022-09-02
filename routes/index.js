const publicRoutes = require("./publicRoutes");
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");

module.exports = (app) => {
  app.use(publicRoutes);
  app.use("/auth", authRoutes);
  app.use("/user", userRoutes);
};
