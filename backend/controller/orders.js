import { createOrder, updateOrderStatus, getOrderById, getAllOrders } from '../models/order';


class Orders {
    constructor() {

    }

    async createOrders(req, res, next) {
        const { name, amount, status } = req.body;
        try {
            const orderId = await createOrder(name, amount, status);
            res.status(201).json({ id: orderId, name, amount, status });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async updateStatus(req, res, next) {
        try {
            const order = await getOrderById(req.params.id);
            if (!order) return res.status(404).json({ message: 'Order not found' });

            const affectedRows = await updateOrderStatus(req.params.id, req.body.status);
            if (affectedRows === 0) return res.status(400).json({ message: 'Failed to update order' });

            res.json({ id: req.params.id, status: req.body.status });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async getOrders(req, res, next) {
        try {
            const orders = await getAllOrders();
            res.json(orders);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}

export default new Orders()