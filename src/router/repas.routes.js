const express = require("express");
const router = express.Router();
const repasCtl = require("../controller/repas.controller");
const categoryController = require("../controller/category.controller");

router.post("/creation", repasCtl.createRepas);

router.get("/", repasCtl.getAllRepas);

// Categories

router.post("/category", categoryController.createCategory);
router.put("/category", categoryController.updateCategory);
router.get("/categories", categoryController.index);

// --- End ---

module.exports = router;
