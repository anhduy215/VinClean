const express = require("express");
const controllersUser = require("../controllers/user");
const { requireSignIn } = require("../controllers/auth");
const { checkRole } = require("../controllers/auth");

const router = express.Router();

router.get("/users", requireSignIn, checkRole(["admin"]), controllersUser.allUsers);
router.get("/user", requireSignIn, controllersUser.getUserBySignIn);
router.get("/user/:userId", requireSignIn, checkRole(["admin"]), controllersUser.getUser);
router.post("/user/create", requireSignIn, checkRole(["admin"]), controllersUser.createUser);
router.put("/user/:userId", controllersUser.updateUserV2);
router.delete("/user/:userId", requireSignIn, checkRole(["admin"]), controllersUser.deleteUser);

module.exports = router;