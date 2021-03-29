const express = require("express");
const router = express.Router();
const restauCtl = require("../controller/restau.controller");
const authMiddleware = require("../Middlewares/auth.middleware");

// Post routes 

router.post("/create", authMiddleware, restauCtl.createRestau);

// GET routes

router.get("/", restauCtl.getAllRestau);
router.get("/list/:restauId", restauCtl.getOrderList);
router.get("/repas/:restauId", restauCtl.getRepasByRestau);

module.exports = router;
