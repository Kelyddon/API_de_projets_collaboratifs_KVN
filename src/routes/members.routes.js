const express = require("express");
const router = express.Router();
const memberController = require("../controllers/member.controller");

// CRUD et filtres
router.get("/", memberController.getAllMembers);
router.put("/:id", memberController.updateMember);
router.delete("/:id", memberController.deleteMember);

module.exports = router;