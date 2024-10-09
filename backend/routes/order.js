import express from 'express';
import Order from '../controller/order';

const router = express.Router();

router.post('/api/order', Order.createOrder);
router.patch('/api/order/:id', Order.updateStatus);
router.get('/api/order', Order.getOrder);

export default router