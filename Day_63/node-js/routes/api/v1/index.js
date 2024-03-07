var express = require("express");
var router = express.Router();

const users = require("./users");
const auth = require("./auth");

router.use("/users", users);
router.use("/auth", auth);

module.exports = router;
