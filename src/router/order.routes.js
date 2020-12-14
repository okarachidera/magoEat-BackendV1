const express = require('express');
const router = express.Router();
const orderCtl = require('../controller/order.controller');

router.post('/placeOrder', orderCtl.placeOrder);
router.post('/closeOrder', orderCtl.closeOrder);
router.post('/updateStatus', orderCtl.updateStatus);
router.post('/cancelOrder', orderCtl.cancelOrder);

module.exports = router