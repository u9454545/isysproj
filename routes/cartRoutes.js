const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Define routes related to the shopping cart
router.get('/cart', cartController.getCart);
router.post('/cart/add/:productId', cartController.addToCart);
router.put('/cart/update/:productId', cartController.updateCartItem);
router.delete('/cart/remove/:productId', cartController.removeCartItem);

module.exports = router;