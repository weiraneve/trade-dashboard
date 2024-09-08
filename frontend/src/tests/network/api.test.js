import {fetchOrders, createOrder, updateOrderStatus} from '../../network/api';

global.fetch = jest.fn();

describe('API functions', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('fetchOrders', () => {
        it('should fetch all orders and return them', async () => {
            const mockOrders = [
                {
                    id: '1',
                    name: 'Order 1',
                    amount: 100,
                    status: 'pending',
                    createdAt: '2023-01-01T00:00:00Z',
                    updatedAt: '2023-01-01T00:00:00Z'
                }
            ];
            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockOrders,
            });

            const result = await fetchOrders();

            expect(fetch).toHaveBeenCalledWith('http://localhost:4000/api/orders');
            expect(result).toEqual(mockOrders.map(order => ({
                ...order,
                createdAt: new Date(order.createdAt),
                updatedAt: new Date(order.updatedAt)
            })));
        });

        it('should return an empty array if the request fails', async () => {
            fetch.mockResolvedValueOnce({
                ok: false,
                statusText: 'Request failed',
            });

            const result = await fetchOrders();

            expect(fetch).toHaveBeenCalledWith('http://localhost:4000/api/orders');
            expect(result).toEqual([]);
        });
    });

    describe('createOrder', () => {
        it('should create a new order', async () => {
            fetch.mockResolvedValueOnce({
                ok: true,
            });

            await createOrder('Test Order', 100, 'pending');

            expect(fetch).toHaveBeenCalledWith('http://localhost:4000/api/orders', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({name: 'Test Order', amount: 100, status: 'pending'}),
            });
        });

        it('should log an error if the request fails', async () => {
            console.error = jest.fn();
            fetch.mockResolvedValueOnce({
                ok: false,
                statusText: 'Request failed',
            });

            await createOrder('Test Order', 100, 'pending');

            expect(console.error).toHaveBeenCalledWith('Failed to create order:', new Error('Network response was not ok'));
        });
    });

    describe('updateOrderStatus', () => {
        it('should update the order status', async () => {
            fetch.mockResolvedValueOnce({
                ok: true,
            });

            await updateOrderStatus('1', 'completed');

            expect(fetch).toHaveBeenCalledWith('http://localhost:4000/api/orders/1', {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({status: 'completed'}),
            });
        });

        it('should log an error if the request fails', async () => {
            console.error = jest.fn();
            fetch.mockResolvedValueOnce({
                ok: false,
                statusText: 'Request failed',
            });

            await updateOrderStatus('1', 'completed');

            expect(console.error).toHaveBeenCalledWith('Failed to update order status:', new Error('Network response was not ok'));
        });
    });
});