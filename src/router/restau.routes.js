const express = require('express');
const router = express.Router();
const restauCtl = require('../controller/restau.controller');

// Post routes 

router.post('/create', restauCtl.createRestau);

module.exports = router;
