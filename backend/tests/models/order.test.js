const { createOrder, updateOrderStatus, getOrderById, getAllOrders } = require('../../models/order');
const { getConnection } = require('../../config/db');

jest.mock('../../config/db');

describe('Order Model', () => {
    let mockConnection;
    let mockExecute;

    beforeEach(() => {
        mockExecute = jest.fn();
        mockConnection = { execute: mockExecute };
        getConnection.mockReturnValue(mockConnection);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createOrder', () => {
        it('should create a new order and return the insertId', async () => {
            const mockResult = [{ insertId: 1 }];
            mockExecute.mockResolvedValue(mockResult);

            const orderId = await createOrder('Test Order', 100, 'pending');

            expect(mockExecute).toHaveBeenCalledWith(
                'INSERT INTO orders (name, amount, status) VALUES (?, ?, ?)',
                ['Test Order', 100, 'pending']
            );
            expect(orderId).toBe(1);
        });

        it('should throw an error if the query fails', async () => {
            mockExecute.mockRejectedValue(new Error('Query failed'));

            await expect(createOrder('Test Order', 100, 'pending')).rejects.toThrow('Query failed');
        });
    });

    describe('updateOrderStatus', () => {
        it('should update the order status and return the affectedRows', async () => {
            const mockResult = [{ affectedRows: 1 }];
            mockExecute.mockResolvedValue(mockResult);

            const affectedRows = await updateOrderStatus(1, 'completed');

            expect(mockExecute).toHaveBeenCalledWith(
                'UPDATE orders SET status = ? WHERE id = ?',
                ['completed', 1]
            );
            expect(affectedRows).toBe(1);
        });

        it('should throw an error if the query fails', async () => {
            mockExecute.mockRejectedValue(new Error('Query failed'));

            await expect(updateOrderStatus(1, 'completed')).rejects.toThrow('Query failed');
        });
    });

    describe('getOrderById', () => {
        it('should return the order if found', async () => {
            const mockOrder = { id: 1, name: 'Test Order', amount: 100, status: 'pending' };
            const mockResult = [[mockOrder]];
            mockExecute.mockResolvedValue(mockResult);

            const order = await getOrderById(1);

            expect(mockExecute).toHaveBeenCalledWith(
                'SELECT * FROM orders WHERE id = ?',
                [1]
            );
            expect(order).toEqual(mockOrder);
        });

        it('should return undefined if the order is not found', async () => {
            const mockResult = [[]];
            mockExecute.mockResolvedValue(mockResult);

            const order = await getOrderById(1);

            expect(mockExecute).toHaveBeenCalledWith(
                'SELECT * FROM orders WHERE id = ?',
                [1]
            );
            expect(order).toBeUndefined();
        });

        it('should throw an error if the query fails', async () => {
            mockExecute.mockRejectedValue(new Error('Query failed'));

            await expect(getOrderById(1)).rejects.toThrow('Query failed');
        });
    });

    describe('getAllOrders', () => {
        it('should return all orders', async () => {
            const mockOrders = [{ id: 1, name: 'Order 1', amount: 100, status: 'pending' }];
            const mockResult = [mockOrders];
            mockExecute.mockResolvedValue(mockResult);

            const orders = await getAllOrders();

            expect(mockExecute).toHaveBeenCalledWith('SELECT * FROM orders');
            expect(orders).toEqual(mockOrders);
        });

        it('should throw an error if the query fails', async () => {
            mockExecute.mockRejectedValue(new Error('Query failed'));

            await expect(getAllOrders()).rejects.toThrow('Query failed');
        });
    });
});