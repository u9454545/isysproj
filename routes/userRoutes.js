const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
console.log("userroutesReach");
// Define routes related to users
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.post('/users/register', userController.registerUser); // Change the path to something like '/users/register'
router.post('/users/login', userController.loginUser); // Change the path to something like '/users/login'
router.put('/users/:id', userController.updateUserProfile);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
