
module.exports = app => {
    const authCtrl = require('../controllers/auth.controller');

    const router = require('express').Router();
    router.post("/signin", authCtrl.signin)
    router.get("/signout", authCtrl.signout)
    app.use("/auth", router);
}