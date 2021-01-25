module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./api/config/db.config.js":
/*!*********************************!*\
  !*** ./api/config/db.config.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconsole.log({ NODENV: \"development\" });\nmodule.exports = {\n                              url:  true ? \"mongodb+srv://root:toor@cluster0-4vfsv.gcp.mongodb.net/primary?retryWrites=true&w=majority\" : undefined\n\n};\n\n//# sourceURL=webpack:///./api/config/db.config.js?");

/***/ }),

/***/ "./api/controllers/beer.controller.js":
/*!********************************************!*\
  !*** ./api/controllers/beer.controller.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar db = __webpack_require__(/*! ../models */ \"./api/models/index.js\");\nvar Beer = db.beers;\n\n// Create and Save a new Beer\nexports.create = function (req, res) {\n  // Validate request\n  if (!req.body.name) {\n    res.status(400).send({ message: \"Content can not be empty!\" });\n    return;\n  }\n\n  // Create a Beer\n  var beer = new Beer({\n    name: req.body.name,\n    image: req.body.image,\n    description: req.body.description,\n    brewery: req.body.brewery,\n    ibu: req.body.ibu,\n    abv: req.body.abv\n  });\n\n  // Save Beer in the database\n  beer.save(beer).then(function (data) {\n    res.send(data);\n  }).catch(function (err) {\n    res.status(500).send({\n      message: err.message || \"Some error occurred while creating the Beer.\"\n    });\n  });\n};\n\n// Retrieve all Beers from the database.\nexports.findAll = function (req, res) {\n  var name = req.query.name;\n  var condition = name ? { name: { $regex: new RegExp(name), $options: \"i\" } } : {};\n\n  Beer.find(condition).then(function (data) {\n    res.send(data);\n  }).catch(function (err) {\n    res.status(500).send({\n      message: err.message || \"Some error occurred while retrieving beers.\"\n    });\n  });\n};\n\n// Find a single Beer with an id\nexports.findOne = function (req, res) {\n  var id = req.params.id;\n\n  Beer.findById(id).then(function (data) {\n    if (!data) res.status(404).send({ message: \"Not found Beer with id \" + id });else res.send(data);\n  }).catch(function (err) {\n    res.status(500).send({ message: \"Error retrieving Beer with id=\" + id });\n  });\n};\n\n// Update a Beer by the id in the request\nexports.update = function (req, res) {\n  if (!req.body) {\n    return res.status(400).send({\n      message: \"Data to update can not be empty!\"\n    });\n  }\n\n  var id = req.params.id;\n\n  Beer.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(function (data) {\n    if (!data) {\n      res.status(404).send({\n        message: \"Cannot update Beer with id=\" + id + \". Maybe Beer was not found!\"\n      });\n    } else res.send({ message: \"Beer was updated successfully.\" });\n  }).catch(function (err) {\n    res.status(500).send({\n      message: \"Error updating Beer with id=\" + id\n    });\n  });\n};\n\n// Delete a Beer with the specified id in the request\nexports.delete = function (req, res) {\n  var id = req.params.id;\n\n  Beer.findByIdAndDelete(id).then(function (data) {\n    if (!data) {\n      res.status(404).send({\n        message: \"Cannot delete Beer with id=\" + id + \". Maybe Beer was not found!\"\n      });\n    } else {\n      res.send({\n        message: \"Beer was deleted successfully!\"\n      });\n    }\n  }).catch(function (err) {\n    res.status(500).send({\n      message: \"Could not delete Beer with id=\" + id\n    });\n  });\n};\n\n// Delete all Beers from the database.\nexports.deleteAll = function (req, res) {\n  Beer.deleteMany({}).then(function (data) {\n    res.send({\n      message: data.deletedCount + \" Beers were deleted successfully!\"\n    });\n  }).catch(function (err) {\n    res.status(500).send({\n      message: err.message || \"Some error occurred while removing all beers.\"\n    });\n  });\n};\n\n// Find all top rated Beers\nexports.findAllTopRated = function (req, res) {\n  // find all beer with rating greater then 3\n  Beer.find({ rating: { $gt: 3 } }).then(function (data) {\n    res.send(data);\n  }).catch(function (err) {\n    res.status(500).send({\n      message: err.message || \"Some error occurred while retrieving beers.\"\n    });\n  });\n};\n\n// Find all favorite Beers\nexports.findFavorites = function (req, res) {\n  Beer.find({ isFavorite: true }).then(function (data) {\n    res.send(data);\n  }).catch(function (err) {\n    res.status(500).send({\n      message: err.message || \"Some error occurred while retrieving beers.\"\n    });\n  });\n};\n\n//# sourceURL=webpack:///./api/controllers/beer.controller.js?");

/***/ }),

/***/ "./api/controllers/brewery.controller.js":
/*!***********************************************!*\
  !*** ./api/controllers/brewery.controller.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar db = __webpack_require__(/*! ../models */ \"./api/models/index.js\");\nvar Brewery = db.breweries;\n\n// Create and Save a new Brewery\nexports.create = function (req, res) {\n  // Validate request\n  if (!req.body.name) {\n    res.status(400).send({ message: \"Content can not be empty!\" });\n    return;\n  }\n\n  // Create a Brewery\n  var brewery = new Brewery({\n    name: req.body.name,\n    image: req.body.image,\n    address: req.body.address,\n    phone: req.body.phone\n  });\n\n  // Save Brewery in the database\n  brewery.save(brewery).then(function (data) {\n    res.send(data);\n  }).catch(function (err) {\n    res.status(500).send({\n      message: err.message || \"Some error occurred while creating the Brewery.\"\n    });\n  });\n};\n\n// Retrieve all Brewerys from the database.\nexports.findAll = function (req, res) {\n  var name = req.query.name;\n  var condition = name ? { name: { $regex: new RegExp(name), $options: \"i\" } } : {};\n\n  Brewery.find(condition).then(function (data) {\n    res.send(data);\n  }).catch(function (err) {\n    res.status(500).send({\n      message: err.message || \"Some error occurred while retrieving breweries.\"\n    });\n  });\n};\n\n// Find a single Brewery with an id\nexports.findOne = function (req, res) {\n  var id = req.params.id;\n\n  Brewery.findById(id).then(function (data) {\n    if (!data) res.status(404).send({ message: \"Not found Brewery with id \" + id });else res.send(data);\n  }).catch(function (err) {\n    res.status(500).send({ message: \"Error retrieving Brewery with id=\" + id });\n  });\n};\n\n// Update a Brewery by the id in the request\nexports.update = function (req, res) {\n  if (!req.body) {\n    return res.status(400).send({\n      message: \"Data to update can not be empty!\"\n    });\n  }\n\n  var id = req.params.id;\n\n  Brewery.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(function (data) {\n    if (!data) {\n      res.status(404).send({\n        message: \"Cannot update Brewery with id=\" + id + \". Maybe Brewery was not found!\"\n      });\n    } else res.send({ message: \"Brewery was updated successfully.\" });\n  }).catch(function (err) {\n    res.status(500).send({\n      message: \"Error updating Brewery with id=\" + id\n    });\n  });\n};\n\n// Delete a Brewery with the specified id in the request\nexports.delete = function (req, res) {\n  var id = req.params.id;\n\n  Brewery.findByIdAndDelete(id).then(function (data) {\n    if (!data) {\n      res.status(404).send({\n        message: \"Cannot delete Brewery with id=\" + id + \". Maybe Brewery was not found!\"\n      });\n    } else {\n      res.send({\n        message: \"Brewery was deleted successfully!\"\n      });\n    }\n  }).catch(function (err) {\n    res.status(500).send({\n      message: \"Could not delete Brewery with id=\" + id\n    });\n  });\n};\n\n// Delete all Brewerys from the database.\nexports.deleteAll = function (req, res) {\n  Brewery.deleteMany({}).then(function (data) {\n    res.send({\n      message: data.deletedCount + \" Brewerys were deleted successfully!\"\n    });\n  }).catch(function (err) {\n    res.status(500).send({\n      message: err.message || \"Some error occurred while removing all breweries.\"\n    });\n  });\n};\n\n// Find all top rated Breweries\nexports.findAllTopRated = function (req, res) {\n  // find all brewery with rating greater then 3\n  Brewery.find({ rating: { $gt: 3 } }).then(function (data) {\n    res.send(data);\n  }).catch(function (err) {\n    res.status(500).send({\n      message: err.message || \"Some error occurred while retrieving brewerys.\"\n    });\n  });\n};\n\n// Find all favorite Breweries\nexports.findFavorites = function (req, res) {\n  Brewery.find({ isFavorite: true }).then(function (data) {\n    res.send(data);\n  }).catch(function (err) {\n    res.status(500).send({\n      message: err.message || \"Some error occurred while retrieving brewerys.\"\n    });\n  });\n};\n\n//# sourceURL=webpack:///./api/controllers/brewery.controller.js?");

/***/ }),

/***/ "./api/models/beer.model.js":
/*!**********************************!*\
  !*** ./api/models/beer.model.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }\n\nmodule.exports = function (mongoose) {\n  var schema = mongoose.Schema({\n    name: String,\n    image: String,\n    description: String,\n    brewery: String,\n    ibu: String,\n    abv: String,\n    rating: Number,\n    isFavorite: Boolean\n  }, { timestamps: true });\n\n  schema.method(\"toJSON\", function () {\n    var _toObject = this.toObject(),\n        __v = _toObject.__v,\n        _id = _toObject._id,\n        object = _objectWithoutProperties(_toObject, [\"__v\", \"_id\"]);\n\n    object.id = _id;\n    return object;\n  });\n\n  var Beer = mongoose.model(\"beer\", schema);\n  return Beer;\n};\n\n//# sourceURL=webpack:///./api/models/beer.model.js?");

/***/ }),

/***/ "./api/models/brewery.model.js":
/*!*************************************!*\
  !*** ./api/models/brewery.model.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }\n\nmodule.exports = function (mongoose) {\n  var schema = mongoose.Schema({\n    name: String,\n    image: String,\n    address: String,\n    phone: String,\n    rating: Number,\n    isFavorite: Boolean\n  }, { timestamps: true });\n\n  schema.method(\"toJSON\", function () {\n    var _toObject = this.toObject(),\n        __v = _toObject.__v,\n        _id = _toObject._id,\n        object = _objectWithoutProperties(_toObject, [\"__v\", \"_id\"]);\n\n    object.id = _id;\n    return object;\n  });\n\n  var Brewery = mongoose.model(\"brewery\", schema);\n  return Brewery;\n};\n\n//# sourceURL=webpack:///./api/models/brewery.model.js?");

/***/ }),

/***/ "./api/models/index.js":
/*!*****************************!*\
  !*** ./api/models/index.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar dbConfig = __webpack_require__(/*! ../config/db.config.js */ \"./api/config/db.config.js\");\n\nvar mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nmongoose.Promise = global.Promise;\n\nvar db = {};\ndb.mongoose = mongoose;\ndb.url = dbConfig.url;\ndb.beers = __webpack_require__(/*! ./beer.model.js */ \"./api/models/beer.model.js\")(mongoose);\ndb.breweries = __webpack_require__(/*! ./brewery.model.js */ \"./api/models/brewery.model.js\")(mongoose);\n\nmodule.exports = db;\n\n//# sourceURL=webpack:///./api/models/index.js?");

/***/ }),

/***/ "./api/routes/beer.routes.js":
/*!***********************************!*\
  !*** ./api/routes/beer.routes.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function (app) {\n  var beers = __webpack_require__(/*! ../controllers/beer.controller.js */ \"./api/controllers/beer.controller.js\");\n\n  var router = __webpack_require__(/*! express */ \"express\").Router();\n\n  // Create a new Beer\n  router.post(\"/\", beers.create);\n\n  // Retrieve all Beers\n  router.get(\"/\", beers.findAll);\n\n  // Retrieve all top rated Beers\n  router.get(\"/toprated\", beers.findAllTopRated);\n\n  // Retrieve all top rated Beers\n  router.get(\"/favorites\", beers.findFavorites);\n\n  // Retrieve a single Beer with id\n  router.get(\"/:id\", beers.findOne);\n\n  // Update a Beer with id\n  router.put(\"/:id\", beers.update);\n\n  // Delete a Beer with id\n  router.delete(\"/:id\", beers.delete);\n\n  // Create a new Beer\n  router.delete(\"/\", beers.deleteAll);\n\n  app.use(\"/api/beers\", router);\n};\n\n//# sourceURL=webpack:///./api/routes/beer.routes.js?");

/***/ }),

/***/ "./api/routes/brewery.routes.js":
/*!**************************************!*\
  !*** ./api/routes/brewery.routes.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function (app) {\n  var breweries = __webpack_require__(/*! ../controllers/brewery.controller.js */ \"./api/controllers/brewery.controller.js\");\n\n  var router = __webpack_require__(/*! express */ \"express\").Router();\n\n  // Create a new Brewery\n  router.post(\"/\", breweries.create);\n\n  // Retrieve all Brewerys\n  router.get(\"/\", breweries.findAll);\n\n  // Retrieve all top rated Breweries\n  router.get(\"/toprated\", breweries.findAllTopRated);\n\n  // Retrieve all top rated Breweries\n  router.get(\"/favorites\", breweries.findFavorites);\n\n  // Retrieve a single Brewery with id\n  router.get(\"/:id\", breweries.findOne);\n\n  // Update a Brewery with id\n  router.put(\"/:id\", breweries.update);\n\n  // Delete a Brewery with id\n  router.delete(\"/:id\", breweries.delete);\n\n  // Create a new Brewery\n  router.delete(\"/\", breweries.deleteAll);\n\n  app.use(\"/api/breweries\", router);\n};\n\n//# sourceURL=webpack:///./api/routes/brewery.routes.js?");

/***/ }),

/***/ "./server.js":
/*!*******************!*\
  !*** ./server.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar express = __webpack_require__(/*! express */ \"express\");\nvar bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\nvar cors = __webpack_require__(/*! cors */ \"cors\");\n\nvar app = express();\n\nvar corsOptions = {\n  origin: \"http://localhost:3000\"\n};\n\napp.use(cors(corsOptions));\n\n// parse requests of content-type - application/json\napp.use(bodyParser.json());\n\n// parse requests of content-type - application/x-www-form-urlencoded\napp.use(bodyParser.urlencoded({ extended: true }));\n\nvar db = __webpack_require__(/*! ./api/models */ \"./api/models/index.js\");\ndb.mongoose.connect(db.url, {\n  useNewUrlParser: true,\n  useUnifiedTopology: true\n}).then(function () {\n  console.log(\"Connected to the database!\");\n}).catch(function (err) {\n  console.log(\"Cannot connect to the database!\", err);\n  process.exit();\n});\n\n// simple route\napp.get(\"/\", function (req, res) {\n  res.json({ message: \"Welcome to hops api.\" });\n});\n\n__webpack_require__(/*! ./api/routes/beer.routes */ \"./api/routes/beer.routes.js\")(app);\n__webpack_require__(/*! ./api/routes/brewery.routes */ \"./api/routes/brewery.routes.js\")(app);\n\n// set port, listen for requests\nvar PORT = process.env.PORT || 8080;\napp.listen(PORT, function () {\n  console.log(\"Server is running on port \" + PORT + \".\");\n});\n\n//# sourceURL=webpack:///./server.js?");

/***/ }),

/***/ 0:
/*!*************************!*\
  !*** multi ./server.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! /Users/joe.chacon/Documents/Projects/hops-api/server.js */\"./server.js\");\n\n\n//# sourceURL=webpack:///multi_./server.js?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cors\");\n\n//# sourceURL=webpack:///external_%22cors%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongoose\");\n\n//# sourceURL=webpack:///external_%22mongoose%22?");

/***/ })

/******/ });