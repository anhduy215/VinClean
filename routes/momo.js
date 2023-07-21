const express = require("express");
const router = express.Router();
const controllersMomo = require("../controllers/momo");

router.post("/momo", controllersMomo.momo);

module.exports = router;
