const express = require("express");
const router = express.Router();
const { userController } = require("../controller/");
const authMiddleware = require("../Middlewares/auth.middleware");

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/validate-message/:idUser", userController.consfirmSms);
// router.post('/sendToAdmins', userController.sendMsgToAdmins);

// route to get connected user

router.get("/user/:username", userController.getUserByUsername);

// to get all the users 
router.get("/users", authMiddleware, userController.getAllUsers);

/**
 * @route:
 * Get complet list of owners of restaurants
 */
router.get("/owners", authMiddleware, userController.getOwners);
router.get("/owner/:idOwner", authMiddleware, userController.showOwner);

module.exports = router;
