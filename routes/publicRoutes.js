const express = require("express");
const publicRouter = express.Router();
const pagesController = require("../controllers/pagesController");
const recomendedUsers = require("../middlewares/sendDataToPartials");

// Rutas Públicas:
// ...

publicRouter.post("/login", pagesController.login);
publicRouter.post("/users", pagesController.store);

publicRouter.get("/enConstruccion", pagesController.error);

module.exports = publicRouter;
