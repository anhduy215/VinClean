const express = require("express");
const controllersOption = require("../controllers/option");
const router = express.Router();

router.get('/option', controllersOption.allOptions);
router.get('/option/:optionID', controllersOption.getOptionById);
router.post('/option', controllersOption.addOption);
router.put('/option/:optionID', controllersOption.updateOption);
router.delete('/option/:optionID', controllersOption.deleteOption);

module.exports = router;