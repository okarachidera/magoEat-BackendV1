const express = require("express");
const router = express.Router();
const userCtl = require("../controller/users.controller");
const authMiddleware = require("../Middlewares/auth.middleware");

router.post("/signup", userCtl.signup);
router.post("/login", userCtl.login);
router.post("/msgConf", userCtl.sendMsgConf);
router.post("/validateSms", userCtl.consfirmSms);
// router.post('/sendToAdmins', userCtl.sendMsgToAdmins);

// route to get connected user

router.get("/user/:username", userCtl.getUserByUsername);

// to get all the users 
router.get("/users", authMiddleware, userCtl.getAllUsers);

/**
 * @route:
 * Get complet list of owners of restaurants
 */
router.get("/owners", authMiddleware, userCtl.getOwners);
router.get("/owner/:idOwner", authMiddleware, userCtl.showOwner);

// Favorite feature
router.post("/favorite/:idUser/:idRestau", authMiddleware, userCtl.addFavoriteRestaurant);

module.exports = router;
