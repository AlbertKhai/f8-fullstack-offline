var express = require("express");
var router = express.Router();
const shortenUrlsController = require("../controllers/shorten.urls.controller");

router.get("/", shortenUrlsController.index);

router.get("/create", shortenUrlsController.create);
router.post("/create", shortenUrlsController.handleCreate);

router.get("/edit/:id", shortenUrlsController.edit);
router.post("/edit/:id", shortenUrlsController.handleEdit);

router.post("/delete/:id", shortenUrlsController.handleDelete);

module.exports = router;
