const express = require("express");
const userController = require("../controller/user");
const userMiddle = require("../middleware/user");
const router = express.Router();

router.use("/signup", userController.signup);
router.use("/login", userController.login);
router.use("/:id", userMiddle, userController.info);

module.exports = router;
