const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Define routes related to products
router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getAllProductsID);
router.post('/products', productController.postNewProduct);
router.put('/products/:id', productController.putUpdateProduct);
router.delete('/products/:id', productController.deleteProduct); 

module.exports = router;
