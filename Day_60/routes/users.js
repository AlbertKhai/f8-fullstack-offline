var express = require("express");
var router = express.Router();
const userController = require("../controllers/user.controller");
const userMiddleware = require("../middlewares/user.middleware");

router.use(userMiddleware);

/* GET users listing. */
router.get("/", userController.index);

router.get("/add", userController.add);
router.post("/add", userController.handleAdd);

router.get("/edit/:id", userController.edit);
router.post("/edit/:id", userController.handleEdit);

router.get("/role/:id", userController.role);
router.post("/role/:id", userController.handleRole);

router.post("/delete/:id", userController.handleDelete);

module.exports = router;
