const express = require("express");
const controllersService = require("../controllers/service");
const router = express.Router();

router.get('/service', controllersService.getAllService);
router.get('/service/:serviceID', controllersService.getServiceById);
router.post('/service', controllersService.addService);
router.put('/service/:serviceID', controllersService.updateService);
router.delete('/service/:serviceID', controllersService.deleteService);

module.exports = router;