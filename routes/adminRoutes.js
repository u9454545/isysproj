const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Define routes related to admin tasks
router.get('/admin/dashboard', adminController.getDashboard);
router.get('/admin/products', adminController.getAllProducts);
router.get('/admin/orders', adminController.getAllOrders);

module.exports = router;
