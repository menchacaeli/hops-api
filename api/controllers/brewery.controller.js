const db = require("../models");
const Brewery = db.breweries;

// Create and Save a new Brewery
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Brewery
  const brewery = new Brewery({
    name: req.body.name,
    image: req.body.image,
    address: req.body.address,
    phone: req.body.phone
  });

  // Save Brewery in the database
  brewery
    .save(brewery)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Brewery."
      });
    });
};

// Retrieve all Brewerys from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: "i" } }
    : {};

  Brewery.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving breweries."
      });
    });
};

// Find a single Brewery with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Brewery.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Brewery with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Brewery with id=" + id });
    });
};

// Update a Brewery by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Brewery.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Brewery with id=${id}. Maybe Brewery was not found!`
        });
      } else res.send({ message: "Brewery was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Brewery with id=" + id
      });
    });
};

// Delete a Brewery with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Brewery.findByIdAndDelete(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Brewery with id=${id}. Maybe Brewery was not found!`
        });
      } else {
        res.send({
          message: "Brewery was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Brewery with id=" + id
      });
    });
};

// Delete all Brewerys from the database.
exports.deleteAll = (req, res) => {
  Brewery.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Brewerys were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all breweries."
      });
    });
};

// Find all top rated Breweries
exports.findAllTopRated = (req, res) => {
  // find all brewery with rating greater then 3
  Brewery.find({ rating: { $gt: 3 } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving brewerys."
      });
    });
};

// Find all favorite Breweries
exports.findFavorites = (req, res) => {
  Brewery.find({ isFavorite: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving brewerys."
      });
    });
};
