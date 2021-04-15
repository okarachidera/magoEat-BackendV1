const express = require("express");
const router = express.Router();
const repasCtl = require("../controller/repas.controller");
const authMiddleware = require("../Middlewares/auth.middleware");
const categoryController = require("../controller/category.controller");

router.post("/:idRestau/creation", authMiddleware, repasCtl.createRepas);

router.get("/", repasCtl.getAllRepas);

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
