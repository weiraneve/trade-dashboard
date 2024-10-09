import express from 'express';
import Orders from '../controller/orders';

const router = express.Router();

router.post('/api/orders', Orders.createOrders);
router.patch('/api/orders/:id', Orders.updateStatus);
router.get('/api/orders', Orders.getOrders);

export default router