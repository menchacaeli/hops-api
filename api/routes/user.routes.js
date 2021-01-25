

// import userCtrl from '../controllers/user.controller';
// import authCtrl from '../controllers/auth.controller.js';
module.exports = app => {
    const userCtrl = require('../controllers/user.controller.js');
    const authCtrl = require('../controllers/auth.controller.js');
    const router = require("express").Router();

    router.get('/list',userCtrl.list)
    
    router.post('/create', userCtrl.create)
    
        router.get("/:userId", authCtrl.requireSignin, userCtrl.read)
        router.put("/:userId", authCtrl.requireSignin, userCtrl.update)
        router.delete("/:userId", authCtrl.requireSignin, userCtrl.remove)
    
    router.param('userId', userCtrl.userById);

    app.use("/api/users", router);

}