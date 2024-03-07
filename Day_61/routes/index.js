var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res) {
   req.baseUrl = "/";
   res.render("index", { req, layout: "layouts/modules" });
});

module.exports = router;
