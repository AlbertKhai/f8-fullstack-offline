var express = require("express");
var router = express.Router();
const userController = require("../../../controllers/api/v1/user.controller");
const authJwtMiddleware = require("../../../middlewares/api/v1/auth.jwt.middleware");

router.use(authJwtMiddleware);

router.get("/", userController.index); // GET /api/v1/users
router.get("/:id", userController.find); // GET /api/v1/users/{id}

// POST /api/v1/users
router.post("/", (req, res, next) => {
   const action = req.header("X-Action");
   if (action === "deletes") {
      return userController.deletes(req, res, next); // Delete multiple users
   }
   return userController.store(req, res, next); // Create user
});

router.patch("/:id", userController.editStore); // PATCH /api/v1/users/{id}

router.delete("/:id", userController.delete); // DELETE /api/v1/users/{id}

module.exports = router;
