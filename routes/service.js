const express = require("express");
const controllersService = require("../controllers/service");
const { requireSignIn } = require("../controllers/auth");
const { checkRole } = require("../controllers/auth");
const router = express.Router();

router.get('/service', controllersService.getAllService);
router.get('/service/:serviceID', controllersService.getServiceById);
router.post('/service', requireSignIn, checkRole(["admin"]), controllersService.addService);
router.put('/service/:serviceID', requireSignIn, checkRole(["admin"]), controllersService.updateService);
router.delete('/service/:serviceID', requireSignIn, checkRole(["admin"]), controllersService.deleteService);

module.exports = router;