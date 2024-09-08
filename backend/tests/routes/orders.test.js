const request = require('supertest');
const express = require('express');
const ordersRouter = require('./orders');
const { createOrder, updateOrderStatus, getOrderById, getAllOrders } = require('../../models/order');

const app = express();
app.use(express.json());
app.use('/api/orders', ordersRouter);

jest.mock('../../backend/models/order');

describe('Orders API', () => {
    describe('POST /api/orders', () => {
        it('should create a new order and return 201', async () => {
            const mockOrder = { id: '1', name: 'Test Order', amount: 100, status: 'pending' };
            createOrder.mockResolvedValue(mockOrder.id);

            const res = await request(app)
                .post('/api/orders')
                .send({ name: mockOrder.name, amount: mockOrder.amount, status: mockOrder.status });

            expect(res.status).toBe(201);
            expect(res.body).toEqual(mockOrder);
        });

        it('should return 400 if there is an error', async () => {
            createOrder.mockRejectedValue(new Error('Invalid data'));

            const res = await request(app)
                .post('/api/orders')
                .send({ name: 'Test Order', amount: 100, status: 'pending' });

            expect(res.status).toBe(400);
            expect(res.body.message).toBe('Invalid data');
        });
    });

    describe('PATCH /api/orders/:id', () => {
        it('should update the order status and return 200', async () => {
            const mockOrder = { id: '1', status: 'completed' };
            getOrderById.mockResolvedValue(mockOrder);
            updateOrderStatus.mockResolvedValue(1);

            const res = await request(app)
                .patch('/api/orders/1')
                .send({ status: 'completed' });

            expect(res.status).toBe(200);
            expect(res.body).toEqual({ id: '1', status: 'completed' });
        });

        it('should return 404 if order is not found', async () => {
            getOrderById.mockResolvedValue(null);

            const res = await request(app)
                .patch('/api/orders/1')
                .send({ status: 'completed' });

            expect(res.status).toBe(404);
            expect(res.body.message).toBe('Order not found');
        });

        it('should return 400 if update fails', async () => {
            const mockOrder = { id: '1', status: 'pending' };
            getOrderById.mockResolvedValue(mockOrder);
            updateOrderStatus.mockResolvedValue(0);

            const res = await request(app)
                .patch('/api/orders/1')
                .send({ status: 'completed' });

            expect(res.status).toBe(400);
            expect(res.body.message).toBe('Failed to update order');
        });

        it('should return 400 if there is an error', async () => {
            getOrderById.mockRejectedValue(new Error('Invalid data'));

            const res = await request(app)
                .patch('/api/orders/1')
                .send({ status: 'completed' });

            expect(res.status).toBe(400);
            expect(res.body.message).toBe('Invalid data');
        });
    });

    describe('GET /api/orders', () => {
        it('should return all orders and 200', async () => {
            const mockOrders = [{ id: '1', name: 'Order 1', amount: 100, status: 'pending' }];
            getAllOrders.mockResolvedValue(mockOrders);

            const res = await request(app).get('/api/orders');

            expect(res.status).toBe(200);
            expect(res.body).toEqual(mockOrders);
        });

        it('should return 500 if there is an error', async () => {
            getAllOrders.mockRejectedValue(new Error('Server error'));

            const res = await request(app).get('/api/orders');

            expect(res.status).toBe(500);
            expect(res.body.message).toBe('Server error');
        });
    });
});