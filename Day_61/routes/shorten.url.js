var express = require("express");
var router = express.Router();
const shortenUrlController = require("../controllers/shorten.url.controller");

router.get("/:id", shortenUrlController.index);
router.post("/:id", shortenUrlController.handlePassword);

module.exports = router;
