const express = require('express');
const router = express.Router();
const restauCtl = require('../controller/restau.controller');

// Post routes 

router.post('/create', restauCtl.createRestau);

// GET routes

router.get('/', restauCtl.getAllRestau);

module.exports = router;
