/* eslint-disable no-unused-vars */
const express = require("express");
const router = express.Router();
const { repasController, userController } = require("../controller/");
const authMiddleware = require("../Middlewares/auth.middleware");
const categoryController = require("../controller/category.controller");

router.post("/:idRestau/creation", authMiddleware, repasController.createRepas);

// Favorite feature
router.put("/favorite/:idUser/:idRepas", authMiddleware, userController.addFavoriteRepas);
router.put("/unfavorite/:idUser/:idRepas", authMiddleware, userController.removeFromFavoriteRepas);

router.get("/", repasController.getAllRepas);

// Categories
router.post("/category", authMiddleware, categoryController.createCategory);
router.put("/category", authMiddleware, categoryController.updateCategory);
router.get("/categories", categoryController.index);

/**
 * @model Subcategory 
 */

router.post("/subcategory", authMiddleware, categoryController.newSubCategory);

// --- End ---

module.exports = router;
