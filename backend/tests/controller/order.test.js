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
        let order = OrderModel;

        test('should update order status successfully', async () => {
            order.findByPk.mockResolvedValue({ id: mockOrderId });
            order.update.mockResolvedValue([1]);

            req.params = { id: mockOrderId };
            req.body = { status: mockStatus };

            await OrderController.updateStatus(req, res, next);

            expect(order.update).toHaveBeenCalledWith(
                { status: mockStatus },
                { where: { id: mockOrderId } }
            );
            expect(res.json).toHaveBeenCalledWith({
                id: mockOrderId,
                status: mockStatus
            });
        });

        test('should handle non-existent order', async () => {
            order.findByPk.mockResolvedValue(null);

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
        const mockOrders = [
            { id: 1, name: 'Order 1', amount: 100, status: 'pending' },
            { id: 2, name: 'Order 2', amount: 200, status: 'completed' }
        ];
        let order = OrderModel;

        test('should get all orders successfully', async () => {
            order.findAll.mockResolvedValue(mockOrders);

            await OrderController.getOrder(req, res, next);

            expect(order.findAll).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(mockOrders);
        });

        test('should handle error when fetching orders', async () => {
            const error = new Error('Database error');
            order.findAll.mockRejectedValue(error);

            await OrderController.getOrder(req, res, next);

            expect(next).toHaveBeenCalledWith(expect.any(Error));
            expect(res.json).not.toHaveBeenCalled();
        });
    });

});