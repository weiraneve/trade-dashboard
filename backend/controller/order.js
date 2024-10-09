import OrderModel from '../models/order';

class Order {
    constructor() {

    }

    async createOrder(req, res, next) {
        const {name, amount, status} = req.body;

        try {
            const order = await OrderModel.create({
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
            const order = await OrderModel.findByPk(req.params.id);
            if (!order) {
                return res.status(404).json({message: 'Order not found'});
            }

            const [updatedRows] = await OrderModel.update(
                {status: req.body.status},
                {where: {id: req.params.id}}
            );

            if (updatedRows === 0) {
                return res.status(400).json({message: 'Failed to update order'});
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
            const order = await OrderModel.findAll();
            res.json(order);
        } catch (error) {
            next(new Error(`Error fetching order: ${error.message}`));
        }
    }

    async deleteOrder(req, res, next) {
        try {
            const order = await OrderModel.findByPk(req.params.id);

            if (!order) {
                return res.status(404).json({message: 'Order not found'});
            }

            await OrderModel.destroy();
            res.status(204).send();
        } catch (error) {
            next(new Error(`Error deleting order: ${error.message}`));
        }
    }
}

export default new Order()