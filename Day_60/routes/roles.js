var express = require("express");
var router = express.Router();
const roleController = require("../controllers/role.controller");
const roleMiddleware = require("../middlewares/role.middleware");

router.use(roleMiddleware);

router.get("/", roleController.index);

router.get("/add", roleController.add);
router.post("/add", roleController.handleAdd);

router.get("/edit/:id", roleController.edit);
router.post("/edit/:id", roleController.handleEdit);

router.post("/delete/:id", roleController.handleDelete);

module.exports = router;
