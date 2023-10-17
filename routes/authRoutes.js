const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Define routes related to authentication
router.post('/auth/register', authController.registerUser);
router.post('/auth/login', authController.loginUser);
router.post('/auth/logout', authController.logoutUser);

module.exports = router;
