var express = require("express");
var router = express.Router();
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const passport = require("passport");

router.get("/logout", authController.logout);

router.use(authMiddleware);

router.get("/login", authController.login);
router.post("/login", authController.handleLogin);

router.get("/google", passport.authenticate("google"));
router.get("/google/callback", authController.handleGoogle);

router.get("/register", authController.register);
router.post("/register", authController.handleRegister);

router.get("/forgot-password", authController.forgotPassword);
router.post("/forgot-password", authController.handleForgotPassword);

router.get("/reset-password/:token", authController.resetPassword);
router.post("/reset-password/:token", authController.handleResetPassword);

module.exports = router;
