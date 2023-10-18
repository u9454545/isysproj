const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Define routes related to authentication
router.post('/auth/register', authController.registerUser);
router.post('/auth/login', authController.authenticateUser);
router.post('/auth/logout', authController.logoutUser);
router.post('/auth/authorise', authController.authoriseUser);
//authenticateUser
module.exports = router;
