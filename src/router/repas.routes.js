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

// Categories
router.get("/categories", categoryController.index);
router.put("/category/update", authMiddleware, categoryController.updateCategory);
router.post("/category", authMiddleware, categoryController.createCategory);
router.get("/category/:idCategory", categoryController.showCategory);

/**
 * @model Subcategory 
 */

router.post("/subcategory", authMiddleware, categoryController.newSubCategory);
router.get("/subcategories", categoryController.showSubCategories);
router.get("/subcategory/:idSubCategory", categoryController.showSubCategory);

// --- End ---

router.get("/:idRepas", repasController.showRepas);
router.get("/", repasController.getAllRepas);

module.exports = router;
