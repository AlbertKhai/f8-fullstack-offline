var express = require("express");
var router = express.Router();
const authController = require("../controllers/auth.controller");

/* GET users listing. */
router.get("/dang-nhap", authController.login);
router.post("/dang-nhap", authController.handleLogin);
router.get("/dang-xuat", authController.handleLogout);

module.exports = router;
