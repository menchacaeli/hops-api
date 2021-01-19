const db = require("../models");
const Beer = db.beers;

// Create and Save a new Beer
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Beer
  const beer = new Beer({
    name: req.body.name,
    image: req.body.image,
    description: req.body.description,
    brewery: req.body.brewery,
    ibu: req.body.ibu,
    abv: req.body.abv
  });

  // Save Beer in the database
  beer
    .save(beer)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Beer."
      });
    });
};

// Retrieve all Beers from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: "i" } }
    : {};

  Beer.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving beers."
      });
    });
};

// Find a single Beer with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Beer.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Beer with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res.status(500).send({ message: "Error retrieving Beer with id=" + id });
    });
};

// Update a Beer by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Beer.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Beer with id=${id}. Maybe Beer was not found!`
        });
      } else res.send({ message: "Beer was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Beer with id=" + id
      });
    });
};

// Delete a Beer with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Beer.findByIdAndDelete(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Beer with id=${id}. Maybe Beer was not found!`
        });
      } else {
        res.send({
          message: "Beer was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Beer with id=" + id
      });
    });
};

// Delete all Beers from the database.
exports.deleteAll = (req, res) => {
  Beer.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Beers were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all beers."
      });
    });
};

// Find all top rated Beers
exports.findAllTopRated = (req, res) => {
  // find all beer with rating greater then 3
  Beer.find({ rating: { $gt: 3 } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving beers."
      });
    });
};

// Find all favorite Beers
exports.findFavorites = (req, res) => {
  Beer.find({ isFavorite: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving beers."
      });
    });
};
