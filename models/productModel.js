const mongoose = require('mongoose');

// Define the product schema
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price can not be less than 0.']
    },
    stockQuantity: {
        type: Number,
        required: true,
        min: [0, 'Stock quantity can not be less than 0.']
    },
    imageUrl: {
        type: String,
        trim: true
    },
    category: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Middleware to set updatedAt before product save
ProductSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Create the model based on the schema
const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
