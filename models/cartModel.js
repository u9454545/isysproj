const mongoose = require('mongoose');

// Define the cart item schema - This is a subdocument inside the cart
const CartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // This should match the name you use when you do mongoose.model('Product', ProductSchema);
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

// Define the cart schema
const CartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // This should match the name you use when you do mongoose.model('User', UserSchema);
        required: true,
        unique: true // Ensure one cart per user
    },
    items: [CartItemSchema], // Array of cart items
    totalAmount: {
        type: Number,
        required: true
    },
    lastModified: {
        type: Date,
        default: Date.now
    }
});

// Create the model based on the schema
const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;
