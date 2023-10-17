// Import necessary modules and models
const Order = require('../models/orderModel');

// Controller functions for managing orders

// Place a new order
const placeOrder = async (req, res) => {
  try {
    const { customerName, items } = req.body;

    // Create a new order
    const order = new Order({
      customerName,
      items,
      status: 'Pending', // Initial status when placing the order
    });

    // Save the order to the database
    const savedOrder = await order.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ error: 'Failed to place the order' });
  }
};

// Get order by ID
const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;

    // Find the order by ID
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error('Error getting order by ID:', error);
    res.status(500).json({ error: 'Failed to get the order' });
  }
};

// Get order history for a user
const getOrderHistory = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you have user authentication

    // Find all orders for the user
    const orders = await Order.find({ customer: userId });

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error getting order history:', error);
    res.status(500).json({ error: 'Failed to get order history' });
  }
};

// Update order status (for administrators)
const updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;

    // Find the order by ID and update its status
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ error: 'Failed to update the order status' });
  }
};

// Process order (for administrators)
const processOrder = async (req, res) => {
  try {
    const orderId = req.params.id;

    // Find the order by ID and update its status to 'Processed'
    const processedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status: 'Processed' },
      { new: true }
    );

    if (!processedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json(processedOrder);
  } catch (error) {
    console.error('Error processing order:', error);
    res.status(500).json({ error: 'Failed to process the order' });
  }
};

// Export the order controller
module.exports = {
  placeOrder,
  getOrderById,
  getOrderHistory,
  updateOrderStatus,
  processOrder,
};