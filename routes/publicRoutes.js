const express = require("express");
const publicRouter = express.Router();
const pagesController = require("../controllers/pagesController");
const authenticatePassport = require("../middlewares/passportAuthenticate");

// Rutas Públicas:
// ...
publicRouter.get("/", pagesController.home);
publicRouter.get("/welcome", pagesController.welcome);
publicRouter.post("/login", authenticatePassport);
publicRouter.post("/users", pagesController.store);

publicRouter.get("/enConstruccion", pagesController.error);

module.exports = publicRouter;
