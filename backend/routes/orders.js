const express = require('express');
const router = express.Router();
const { createOrder, updateOrderStatus, getOrderById, getAllOrders } = require('../models/order');

router.post('/api/orders', async (req, res) => {
    const { name, amount, status } = req.body;
    try {
        const orderId = await createOrder(name, amount, status);
        res.status(201).json({ id: orderId, name, amount, status });
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

router.get('/api/orders', async (req, res) => {
    try {
        const orders = await getAllOrders();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;