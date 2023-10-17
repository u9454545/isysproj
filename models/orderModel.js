const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, default: 1 }
    }],
    totalAmount: { type: Number, required: true },
    status: { type: String, default: 'pending' },  // e.g., 'pending', 'processed', 'shipped', 'delivered'
    orderDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);

