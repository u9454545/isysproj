const mongoose = require('mongoose');


const ProductSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity can not be less than 1.']
    },
    price: {
        type: Number,
        required: true
    }
}, { _id: false }); // Prevents addition of an _id field to each subdocument

// Define the order schema
const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
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
