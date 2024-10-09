import Order from '../models/order';

class Orders {
    constructor() {

    }

    async createOrders(req, res, next) {
        const { name, amount, status } = req.body;

        try {
            const order = await Order.create({
                name,
                amount,
                status
            });

            res.status(201).json({
                id: order.id,
                name,
                amount,
                status
            });
        } catch (error) {
            next(new Error(`Error creating order: ${error.message}`));
        }
    }

    async updateStatus(req, res, next) {
        try {
            const order = await Order.findByPk(req.params.id);
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }

            const [updatedRows] = await Order.update(
                { status: req.body.status },
                { where: { id: req.params.id } }
            );

            if (updatedRows === 0) {
                return res.status(400).json({ message: 'Failed to update order' });
            }

            res.json({
                id: req.params.id,
                status: req.body.status
            });
        } catch (error) {
            next(new Error(`Error updating order status: ${error.message}`));
        }
    }

    async getOrder(req, res, next) {
        try {
            const order = await Order.findByPk(req.params.id);

            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }

            res.json(order);
        } catch (error) {
            next(new Error(`Error fetching order: ${error.message}`));
        }
    }

    async getOrders(req, res, next) {
        try {
            const orders = await Order.findAll();
            res.json(orders);
        } catch (error) {
            next(new Error(`Error fetching orders: ${error.message}`));
        }
    }

    async deleteOrder(req, res, next) {
        try {
            const order = await Order.findByPk(req.params.id);

            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }

            await order.destroy();
            res.status(204).send();
        } catch (error) {
            next(new Error(`Error deleting order: ${error.message}`));
        }
    }
}

export default new Orders()