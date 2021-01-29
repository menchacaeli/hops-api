const db = require('../models');
const User = db.user;
const _ = require('lodash');
const errHandler = require('../../helpers/dbErrorHandler');
const { default: dbErrorHandler } = require('../../helpers/dbErrorHandler');
exports.create = (req, res, next) => {
    const user = new User(req.body);
    user.save((err, result) => {
        if (err) {
            console.error("Error: Issue create new user")
            return res.status(404).json({
                error: dbErrorHandler.getErrorMessage(err)
            })
        }
        res.status(200).json({
            message: "successfully signed up"
        })
    })
}
exports.list = (req, res) => {
    User.find((err, users) => {
        if (err) {
            return res.status(400).json({
                error: dbErrorHandler.getErrorMessage(err)
            })
        }
        res.json(users);
    }).select('name email updated created')
}

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status('400').json({
                error: "User not found"
            })
        }
        req.profile = user;
        next();
    })
}

exports.read = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
}

exports.update = (req, res, next) => {
    let user = req.profile;
    user = _.extend(user, req.body);
    user.updated = Date.now();
    user.save((err) => {
        if (err) {
            return res.status(400).json({
                error: dbErrorHandler.getErrorMessage(err)
            })
        }
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json(user);
    })
}
exports.remove = (req, res, next) => {
    let user = req.profile;
    user.remove((err, deletedUser) => {
        if (err) {
            return res.status(400).json({
                error: dbErrorHandler.getErrorMessage(err)
            })
        }
    })
}

// export default { create, userById, read, list, remove, update }