const express = require("express");
const auth = require("../controllers/auth");
const controllersUser = require("../controllers/user");
const router = express.Router();

router.post("/signIn", auth.signIn);
router.post("/signUp", auth.signUp);
router.post("/verifyEmail", auth.verifyEmail);
router.post("/signOut", auth.signOut);
router.put("/verify-email", auth.verifyEmail);
router.post("/upload",auth.uploadImage);
router.param("login", controllersUser.userByLogin);

module.exports = router;