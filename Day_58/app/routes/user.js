var express = require("express");
var router = express.Router();

const userController = require("../controllers/user.controller");

router.get("/", userController.index);
router.get("/edit", userController.edit);
router.post("/edit", userController.handleEdit);
router.get("/changePass", userController.changePass);
router.post("/changePass", userController.handleChangePass);
router.get("/devices", userController.devices);
router.post("/devices", userController.handleDevices);

module.exports = router;
