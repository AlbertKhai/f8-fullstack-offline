var express = require("express");
var router = express.Router();

const userController = require("../controllers/api/v1/user.controller");
const authJwtController = require("../controllers/api/v1/auth.controller");
const authMiddleware = require("../middlewares/api/auth.middleware");

/* GET home page. */
router.get("/v1/users", userController.index); // GET /api/v1/users
router.get("/v1/users/:id", userController.find); // GET /api/v1/users/{id}
router.post("/v1/users", userController.store); // POST /api/v1/users/{id}

router.post("/v1/auth/login", authJwtController.login); // POST /api/v1/users/{id}
router.get("/v1/auth/profile", authMiddleware, authJwtController.profile); // GET /api/v1/users/{id}
router.post("/v1/auth/logout", authMiddleware, authJwtController.logout); // POST /api/v1/users/{id}
router.post("/v1/auth/refresh", authJwtController.refresh); // POST /api/v1/users/{id}

module.exports = router;
