const express = require("express");
const router = express.Router();
const { orderController } = require("../controller/");
const authMiddleware = require("../Middlewares/auth.middleware");

// Post routes

router.post("/placeOrder", authMiddleware, orderController.placeOrder);
router.post("/closeOrder", authMiddleware, orderController.closeOrder);
router.post("/updateStatus", authMiddleware, orderController.updateStatus);
router.post("/cancelOrder", authMiddleware, orderController.cancelOrder);
router.post("/rate/:order", authMiddleware, orderController.rateOrder);

// The get routes

router.get("/orders", authMiddleware, orderController.getAllOrders);
router.get("/orders/:idUser", authMiddleware, orderController.getOrdersHistory);

// The put routes

router.put("/update/:id", authMiddleware, orderController.updateStatus);
router.put("/close/:id", authMiddleware, orderController.closeOrder);

module.exports = router;