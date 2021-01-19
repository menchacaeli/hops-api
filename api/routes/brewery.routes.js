module.exports = app => {
  const breweries = require("../controllers/brewery.controller.js");

  var router = require("express").Router();

  // Create a new Brewery
  router.post("/", breweries.create);

  // Retrieve all Brewerys
  router.get("/", breweries.findAll);

  // Retrieve all top rated Breweries
  router.get("/toprated", breweries.findAllTopRated);

  // Retrieve all top rated Breweries
  router.get("/favorites", breweries.findFavorites);

  // Retrieve a single Brewery with id
  router.get("/:id", breweries.findOne);

  // Update a Brewery with id
  router.put("/:id", breweries.update);

  // Delete a Brewery with id
  router.delete("/:id", breweries.delete);

  // Create a new Brewery
  router.delete("/", breweries.deleteAll);

  app.use("/api/breweries", router);
};
