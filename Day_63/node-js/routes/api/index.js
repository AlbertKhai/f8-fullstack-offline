var express = require("express");
var router = express.Router();

const apiV1 = require("./v1");

router.use("/v1", apiV1);

module.exports = router;
