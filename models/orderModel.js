const mongoose = require('mongoose');

// Define the order schema
const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // This should match the name you use when you do mongoose.model('User', UserSchema);
        required: true
    },
    products: [ProductSchema], // Array of product subdocuments
    totalAmount: {
        type: Number,
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['Pending', 'Shipped', 'Delivered', 'Canceled'],
        default: 'Pending'
    }
});

// Create the model based on the schema
const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
