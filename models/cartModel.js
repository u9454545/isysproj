const mongoose = require('mongoose');

// cart item schema
const CartItemSchema = new mongoose.Schema({
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
}, { _id: false });

// Define cart schema
const CartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
        unique: true 
    },
    items: [CartItemSchema],
    totalAmount: {
        type: Number,
        required: true
    },
    lastModified: {
        type: Date,
        default: Date.now
    }
});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;
