import {fetchOrder, createOrder, updateOrdertatus} from '../../network/api';

global.fetch = jest.fn();

describe('API functions', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('fetchOrder', () => {
        it('should fetch all order and return them', async () => {
            const mockOrder = [
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
                json: async () => mockOrder,
            });

            const result = await fetchOrder();

            expect(fetch).toHaveBeenCalledWith('http://localhost:4000/api/order');
            expect(result).toEqual(mockOrder.map(order => ({
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

            const result = await fetchOrder();

            expect(fetch).toHaveBeenCalledWith('http://localhost:4000/api/order');
            expect(result).toEqual([]);
        });
    });

    describe('createOrder', () => {
        it('should create a new order', async () => {
            fetch.mockResolvedValueOnce({
                ok: true,
            });

            await createOrder('Test Order', 100, 'pending');

            expect(fetch).toHaveBeenCalledWith('http://localhost:4000/api/order', {
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

    describe('updateOrdertatus', () => {
        it('should update the order status', async () => {
            fetch.mockResolvedValueOnce({
                ok: true,
            });

            await updateOrdertatus('1', 'completed');

            expect(fetch).toHaveBeenCalledWith('http://localhost:4000/api/order/1', {
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

            await updateOrdertatus('1', 'completed');

            expect(console.error).toHaveBeenCalledWith('Failed to update order status:', new Error('Network response was not ok'));
        });
    });
});