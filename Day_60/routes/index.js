var express = require("express");
const { createClient } = require("redis");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res) {
   req.baseUrl = "/";
   res.render("index", { req, layout: "layouts/modules" });
});

router.get("/test-redis", async (req, res) => {
   const client = createClient();

   client.on("error", (err) => console.log("Redis Client Error", err));

   await client.connect();

   await client.set("key", "value", { EX: 10 });
   const value = await client.get("key");
   return res.json({ value });
});
module.exports = router;
