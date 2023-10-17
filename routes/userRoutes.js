const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define routes related to users
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.post('/users', userController.registerUser);
router.put('/users/:id', userController.updateUserProfile);
router.post('/users', userController.loginUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
