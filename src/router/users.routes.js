const express = require("express");
const router = express.Router();
const userCtl = require("../controller/users.controller");

router.post("/signup", userCtl.signup);
router.post("/login", userCtl.login);
router.post("/msgConf", userCtl.sendMsgConf);
router.post("/validateSms", userCtl.consfirmSms);
// router.post('/sendToAdmins', userCtl.sendMsgToAdmins)

// route to get connected user

router.get("/user/:username", userCtl.getUserByUsername);
// to get all the users 
router.get("/users", userCtl.getAllUsers);
// to get all owners 
router.get("/owners", userCtl.getOwners);

module.exports = router;