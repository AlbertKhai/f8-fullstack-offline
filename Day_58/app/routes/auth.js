var express = require("express");
var router = express.Router();
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/dang-xuat", authController.handleLogout);

router.use("/dang-ky", authMiddleware);
router.use("/dang-nhap", authMiddleware);

router.get("/dang-ky", authController.register);
router.post("/dang-ky", authController.handleRegister);

router.get("/dang-nhap", authController.login);
router.post("/dang-nhap", authController.handleLogin);

module.exports = router;
