const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    type: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, required: true, enum: ['pending', 'completed', 'cancelled'] },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);