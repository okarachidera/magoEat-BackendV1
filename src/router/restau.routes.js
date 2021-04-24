const express = require("express");
const router = express.Router();
const {
    restaurantController,
    userController
} = require("../controller/");
const authMiddleware = require("../Middlewares/auth.middleware");

// Post routes 

router.post("/create", authMiddleware, restaurantController.createRestau);

// GET routes

router.get("/", restaurantController.getAllRestau);
router.get("/:restauId", restaurantController.showRestau);
router.get("/list/:restauId", restaurantController.getOrderList);
router.get("/repas/:restauId", restaurantController.getRepasByRestau);

// Favorite feature
router.post("/favorite/:idUser/:idRestau", authMiddleware, userController.addFavoriteRestaurant);

module.exports = router;
