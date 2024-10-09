import OrderModel from '../../models/order';
import OrderController from '../../controller/order';

jest.mock('../../models/order');

describe('Order Controller', () => {
    let req;
    let res;
    let next;

    beforeEach(() => {
        jest.clearAllMocks();

        req = {
            body: {},
            params: {},
        };

        res = {
            json: jest.fn(() => res),
            status: jest.fn(() => res),
            send: jest.fn(),
        };

        next = jest.fn();
    });

    describe('createOrder', () => {
        const mockOrderData = {
            name: 'Test Order',
            amount: 100,
            status: 'pending'
        };

        let order = OrderModel;
        test('should create order successfully', async () => {
            const mockCreatedOrder = { id: 1, ...mockOrderData };
            order.create.mockResolvedValue(mockCreatedOrder);

            req.body = mockOrderData;

            await OrderController.createOrder(req, res, next);

            expect(order.create).toHaveBeenCalledWith(mockOrderData);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(mockCreatedOrder);
            expect(next).not.toHaveBeenCalled();
        });

        test('should handle creation error', async () => {
            const error = new Error('Database error');
            order.create.mockRejectedValue(error);

            req.body = mockOrderData;

            await OrderController.createOrder(req, res, next);

            expect(next).toHaveBeenCalledWith(expect.any(Error));
            expect(res.json).not.toHaveBeenCalled();
        });
    });

    describe('updateStatus', () => {
        const mockOrderId = 1;
        const mockStatus = 'completed';

        test('should update order status successfully', async () => {
            Order.findByPk.mockResolvedValue({ id: mockOrderId });
            Order.update.mockResolvedValue([1]);

            req.params = { id: mockOrderId };
            req.body = { status: mockStatus };

            await OrderController.updateStatus(req, res, next);

            expect(Order.update).toHaveBeenCalledWith(
                { status: mockStatus },
                { where: { id: mockOrderId } }
            );
            expect(res.json).toHaveBeenCalledWith({
                id: mockOrderId,
                status: mockStatus
            });
        });

        test('should handle non-existent order', async () => {
            Order.findByPk.mockResolvedValue(null);

            req.params = { id: mockOrderId };
            req.body = { status: mockStatus };

            await OrderController.updateStatus(req, res, next);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Order not found'
            });
        });
    });

    describe('getOrder', () => {
        const mockOrderId = 1;
        const mockOrder = {
            id: mockOrderId,
            name: 'Test Order',
            amount: 100,
            status: 'pending'
        };

        test('should get order by id successfully', async () => {
            Order.findByPk.mockResolvedValue(mockOrder);

            req.params = { id: mockOrderId };

            await OrderController.getOrder(req, res, next);

            expect(Order.findByPk).toHaveBeenCalledWith(mockOrderId);
            expect(res.json).toHaveBeenCalledWith(mockOrder);
        });

        test('should handle non-existent order', async () => {
            Order.findByPk.mockResolvedValue(null);

            req.params = { id: mockOrderId };

            await OrderController.getOrder(req, res, next);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Order not found'
            });
        });
    });

    describe('getAllOrders', () => {
        const mockOrders = [
            { id: 1, name: 'Order 1', amount: 100, status: 'pending' },
            { id: 2, name: 'Order 2', amount: 200, status: 'completed' }
        ];

        test('should get all orders successfully', async () => {
            Order.findAll.mockResolvedValue(mockOrders);

            await OrderController.getOrders(req, res, next);

            expect(Order.findAll).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(mockOrders);
        });

        test('should handle error when fetching orders', async () => {
            const error = new Error('Database error');
            Order.findAll.mockRejectedValue(error);

            await OrderController.getOrders(req, res, next);

            expect(next).toHaveBeenCalledWith(expect.any(Error));
            expect(res.json).not.toHaveBeenCalled();
        });
    });

    describe('deleteOrder', () => {
        const mockOrderId = 1;
        const mockOrder = {
            id: mockOrderId,
            destroy: jest.fn(),
        };

        test('should delete order successfully', async () => {
            Order.findByPk.mockResolvedValue(mockOrder);
            mockOrder.destroy.mockResolvedValue();

            req.params = { id: mockOrderId };

            await OrderController.deleteOrder(req, res, next);

            expect(Order.findByPk).toHaveBeenCalledWith(mockOrderId);
            expect(mockOrder.destroy).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(204);
            expect(res.send).toHaveBeenCalled();
        });

        test('should handle non-existent order deletion', async () => {
            Order.findByPk.mockResolvedValue(null);

            req.params = { id: mockOrderId };

            await OrderController.deleteOrder(req, res, next);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Order not found'
            });
        });
    });
});