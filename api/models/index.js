const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.beers = require("./beer.model.js")(mongoose);
db.breweries = require("./brewery.model.js")(mongoose);
db.user = require('./user.model.js')(mongoose);
module.exports = db;
