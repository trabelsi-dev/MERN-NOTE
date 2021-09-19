const express = require("express");
const {registerUser,authUser,updateUserProfile} = require('../controlles/userControllers')
const router = express.Router();
const { protect} = require("../middlewares/authMiddleware")

// hedom route w hawka in3awit lil controllers kima registerUser et authlogin
router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.route("/profile").post(protect,updateUserProfile);

module.exports = router