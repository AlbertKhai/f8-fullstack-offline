var express = require("express");
var router = express.Router();
const userController = require("../controllers/user.controller");

/* GET users listing. */
router.get("/", userController.index);
router.post("/create", userController.create);
router.post("/edit", userController.edit);
router.post("/delete", userController.delete);

module.exports = router;
