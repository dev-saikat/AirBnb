const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const userController = require("../controllers/users");


//SignUp
router.get("/signup", userController.renderSignUp);

router.post("/signup", wrapAsync(userController.signup));

//Login

router.get("/login", userController.renderSignIn);

router.post("/login",saveRedirectUrl, passport.authenticate("local", { failureRedirect: '/login', failureFlash: true }), userController.signIn);

//Log Out

router.get("/logout", userController.logOut);

module.exports = router;