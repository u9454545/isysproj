// Import necessary modules and models
const Order = require('../models/orderModel');

// Controller functions for managing orders

// Place a new order
const placeOrder = async (req, res) => {
  try {
    const { userId, products, totalAmount } = req.body;

    const order = new Order({ userId, products, totalAmount, status: 'Pending' });
    const savedOrder = await order.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Error placing order: orderController', error);
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
    const userId = req.user.id; 

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

// Get all orders
const getAllOrders = async (req, res) => {
  console.log("reaching get all orders");
  try {
    // Find all orders
    const orders = await Order.find();

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error getting all orders:', error);
    res.status(500).json({ error: 'Failed to get all orders' });
  }
};

// Delete an order by ID
const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;

    // Find and delete the order by ID
    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json(deletedOrder);
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: 'Failed to delete the order' });
  }
};
// Function to return an HTML page
const getHtmlPage = (req, res) => {
  try {
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Sample HTML Page</title>
      </head>
      <body>
        <h1>Welcome to the Sample HTML Page</h1>
        <p>This is an example HTML page.</p>
      </body>
      </html>
    `;

    res.send(htmlContent);
  } catch (error) {
    console.error('Error sending HTML page:', error);
    res.status(500).json({ error: 'Failed to send the HTML page' });
  }
};

// Export the order controller
module.exports = {
  placeOrder,
  getOrderById,
  getOrderHistory,
  updateOrderStatus,
  processOrder,
  getAllOrders,
  deleteOrder,
  getHtmlPage,
};