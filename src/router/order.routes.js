const express = require('express');
const router = express.Router();
const orderCtl = require('../controller/order.controller');

// Post routes

router.post('/placeOrder', orderCtl.placeOrder);
router.post('/closeOrder', orderCtl.closeOrder);
router.post('/updateStatus', orderCtl.updateStatus);
router.post('/cancelOrder', orderCtl.cancelOrder);

// The get routes

router.get('/orders', orderCtl.getAllOrders);
router.get('/orders/:idUser', orderCtl.getOrdersHistory);

// The put routes

router.put('/update/:id', orderCtl.updateStatus);
router.put('/close/:id', orderCtl.closeOrder);

module.exports = router