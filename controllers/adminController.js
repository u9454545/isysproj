// Import necessary modules and models
const Product = require('./models/Product'); // Import the Product model
const Order = require('./models/Order'); // Import the Order model
const User = require('./models/User'); // Import the User model

// Controller functions for managing admin tasks

// Manage products as an admin
const manageProducts = async (req, res) => {
  try {
    const { action } = req.query; // Get the action parameter from the query string

    if (action === 'add') {
      // Add a new product (POST request)
      const newProduct = new Product(req.body);
      await newProduct.save();
    } else if (action === 'update') {
      // Update a product (PUT request)
      const { productId } = req.params;
      const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true });
    } else if (action === 'delete') {
      // Delete a product (DELETE request)
      const { productId } = req.params;
      await Product.findByIdAndRemove(productId);
    }

    // Retrieve all products
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Manage orders as an admin
const manageOrders = async (req, res) => {
  try {
    const { action } = req.query; // Get the action parameter from the query string

    if (action === 'updateStatus') {
      // Change order status (PUT request)
      const { orderId } = req.params;
      const { newStatus } = req.body;
      const updatedOrder = await Order.findByIdAndUpdate(orderId, { status: newStatus }, { new: true });
    }

    // Retrieve all orders
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Manage user accounts as an admin
const manageUserAccounts = async (req, res) => {
  try {
    const { action } = req.query; // Get the action parameter from the query string

    if (action === 'suspend') {
      // Suspend a user account (PUT request)
      const { userId } = req.params;
      const { isSuspended } = req.body;
      const updatedUser = await User.findByIdAndUpdate(userId, { isSuspended }, { new: true });
    } else if (action === 'delete') {
      // Delete a user account (DELETE request)
      const { userId } = req.params;
      await User.findByIdAndRemove(userId);
    }

    // Retrieve all user accounts
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Export the admin controller
module.exports = {
  manageProducts,
  manageOrders,
  manageUserAccounts,
};