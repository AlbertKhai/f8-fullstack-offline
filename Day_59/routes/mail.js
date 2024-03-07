var express = require("express");
var router = express.Router();
const mailController = require("../controllers/mail.controller");
const loggedMiddleware = require("../middlewares/logged.middleware");

router.get("/img/:token", mailController.handleViewed);

router.use(loggedMiddleware);

router.get("/", mailController.mail);

router.get("/send", mailController.sendMail);
router.post("/send", mailController.handleSendMail);

router.get("/detail/:id", mailController.detail);

module.exports = router;
