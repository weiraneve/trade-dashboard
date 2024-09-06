const express = require('express');
const router = express.Router();
const { createOrder, updateOrderStatus, getOrderById } = require('../models/order');

router.post('/api/orders', async (req, res) => {
    const { type, amount, status } = req.body;
    try {
        const orderId = await createOrder(type, amount, status);
        res.status(201).json({ id: orderId, type, amount, status });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.patch('/api/orders/:id', async (req, res) => {
    try {
        const order = await getOrderById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        const affectedRows = await updateOrderStatus(req.params.id, req.body.status);
        if (affectedRows === 0) return res.status(400).json({ message: 'Failed to update order' });

        res.json({ id: req.params.id, status: req.body.status });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;