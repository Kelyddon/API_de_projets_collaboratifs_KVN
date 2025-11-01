const express = require("express");
const router = express.Router();
const memberController = require("../controllers/member.controller");

// CRUD et filtres
router.get("/", memberController.getAll);
router.put("/:id", memberController.update);
router.delete("/:id", memberController.remove);

module.exports = router;
