// Import necessary modules and dependencies
const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // You should have a Product model defined

// Route to get a list of all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find(); // Fetch products from your database
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to get details of a specific product by ID
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id); // Fetch product by ID
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to add a new product (admin only)
router.post('/products', async (req, res) => {
  // Check if the user making the request is an admin
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ message: 'Forbidden: Admin access required' });
  }

  const newProduct = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    // Add other product details as needed
  });

  try {
    const savedProduct = await newProduct.save();
    res.json(savedProduct);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to update a product (admin only)
router.put('/products/:id', async (req, res) => {
  // Check if the user making the request is an admin
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ message: 'Forbidden: Admin access required' });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to delete a product (admin only)
router.delete('/products/:id', async (req, res) => {
  // Check if the user making the request is an admin
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ message: 'Forbidden: Admin access required' });
  }

  try {
    const deletedProduct = await Product.findByIdAndRemove(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
