const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: String,
    image: String, // URL to the product image
    stock: { type: Number, required: true, default: 0 }
});

module.exports = mongoose.model('Product', productSchema);
