const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');

// return all products
const getAllProducts = async (req, res) => {
  console.log('reaching get all products')
  try {
    const products = await Product.find(); 
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// return product by ID
const getAllProductsID = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id); 
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Add new product to database
const postNewProduct = async (req, res) => {
  try {
    const newProduct = new Product({
      productId: req.body.productId,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category
    });

    const savedProduct = await newProduct.save();
    res.json(savedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
};

// update product in the database
const putUpdateProduct = async (req, res) => {

  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// delete product in databse
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndRemove(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
 
module.exports = {
  getAllProducts,
  getAllProductsID,
  postNewProduct,
  putUpdateProduct,
  deleteProduct
};
