const express = require("express");
const publicRouter = express.Router();
const pagesController = require("../controllers/pagesController");
const authenticatePassport = require("../middlewares/passportAuthenticate");

// Rutas Públicas:
// ...
publicRouter.get("/", pagesController.home);
publicRouter.get("/welcome", pagesController.welcome);
publicRouter.get("/login", pagesController.showLogin);
publicRouter.post("/login", authenticatePassport);
publicRouter.get("/register", pagesController.showRegister);
publicRouter.post("/register", pagesController.register);

module.exports = publicRouter;
