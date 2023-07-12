const express = require("express");
const controllersOption = require("../controllers/option");
const { requireSignIn } = require("../controllers/auth");
const { checkRole } = require("../controllers/auth");
const router = express.Router();

router.get('/option', controllersOption.allOptions);
router.get('/option/:optionID', controllersOption.getOptionById);
router.post('/option', requireSignIn, checkRole(["admin"]), controllersOption.addOption);
router.put('/option/:optionID', requireSignIn, checkRole(["admin"]), controllersOption.updateOption);
router.delete('/option/:optionID', requireSignIn, checkRole(["admin"]), controllersOption.deleteOption);

module.exports = router;