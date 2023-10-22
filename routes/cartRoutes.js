const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.get('/cart', cartController.getCart);
router.post('/cart/add/:productId', cartController.addToCart);
router.put('/cart/update/:productId', cartController.updateCart);
router.delete('/cart/remove/:productId', cartController.removeFromCart);

module.exports = router;
