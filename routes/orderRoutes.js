const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/orders', orderController.getAllOrders);
router.get('/orders/:id', orderController.getOrderById);
router.post('/orders', orderController.placeOrder);
router.put('/orders/:id', orderController.updateOrderStatus);
router.delete('/orders/:id', orderController.deleteOrder);
router.get('/orders/:id', orderController.getOrderHistory);
router.get('/orders/:id', orderController.processOrder);
router.get('/htmlpage', orderController.getHtmlPage);
module.exports = router;

