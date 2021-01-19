module.exports = app => {
  const beers = require("../controllers/beer.controller.js");

  var router = require("express").Router();

  // Create a new Beer
  router.post("/", beers.create);

  // Retrieve all Beers
  router.get("/", beers.findAll);

  // Retrieve all top rated Beers
  router.get("/toprated", beers.findAllTopRated);

  // Retrieve all top rated Beers
  router.get("/favorites", beers.findFavorites);

  // Retrieve a single Beer with id
  router.get("/:id", beers.findOne);

  // Update a Beer with id
  router.put("/:id", beers.update);

  // Delete a Beer with id
  router.delete("/:id", beers.delete);

  // Create a new Beer
  router.delete("/", beers.deleteAll);

  app.use("/api/beers", router);
};
