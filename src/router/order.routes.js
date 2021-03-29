const express = require("express");
const router = express.Router();
const orderCtl = require("../controller/order.controller");
const authMiddleware = require("../Middlewares/auth.middleware");

// Post routes

router.post("/placeOrder", authMiddleware, orderCtl.placeOrder);
router.post("/closeOrder", authMiddleware, orderCtl.closeOrder);
router.post("/updateStatus", authMiddleware, orderCtl.updateStatus);
router.post("/cancelOrder", authMiddleware, orderCtl.cancelOrder);
router.post("/rate/:id", authMiddleware, orderCtl.rateOrder);

// The get routes

router.get("/orders", authMiddleware, orderCtl.getAllOrders);
router.get("/orders/:idUser", authMiddleware, orderCtl.getOrdersHistory);

// The put routes

router.put("/update/:id", authMiddleware, orderCtl.updateStatus);
router.put("/close/:id", authMiddleware, orderCtl.closeOrder);

module.exports = router;