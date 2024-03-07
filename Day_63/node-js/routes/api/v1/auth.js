var express = require("express");
var router = express.Router();
const authJwtMiddleware = require("../../../middlewares/api/v1/auth.jwt.middleware");
const authPassportMiddleware = require("../../../middlewares/api/v1/auth.passport.middleware");
const authController = require("../../../controllers/api/v1/auth.controller");

router.post("/login", authController.login); // POST /api/v1/auth/login
router.post("/refresh", authController.refresh); // POST /api/v1/auth/refresh

router.get("/profile", authJwtMiddleware, authController.profile); // GET /api/v1/auth/profile
router.post("/logout", authJwtMiddleware, authController.logout); // POST /api/v1/auth/logout

router.get("/google", authController.google); // GET /api/v1/auth/google
router.get("/google/callback", authController.handleGoogle); // GET /api/v1/auth/google/callback

router.get("/github", authController.github); // GET /api/v1/auth/github
router.get("/github/callback", authController.handleGithub); // GET /api/v1/auth/github/callback

router.get("/success", authPassportMiddleware, authController.success); // GET /api/v1/auth/success
router.get("/failure", authController.failure); // GET /api/v1/auth/success

module.exports = router;
