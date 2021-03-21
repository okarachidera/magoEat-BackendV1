const express = require("express");
const router = express.Router();
const repasCtl = require("../controller/repas.controller");

router.post("/creation", repasCtl.createRepas);

router.get("/", repasCtl.getAllRepas);

module.exports = router;