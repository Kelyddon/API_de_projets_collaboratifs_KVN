const express = require('express');
const router = express.Router();

// Use member.controller for register/login (or switch to auth.controller if you prefer)
const memberController = require('../controllers/member.controller');

router.post('/register', memberController.register);
router.post('/login', memberController.login);

module.exports = router;