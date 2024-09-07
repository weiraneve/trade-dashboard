import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
import OrderList from './components/OrderList';
import OrderForm from './components/OrderForm';
import OrderChart from './components/OrderChart';
import { fetchOrders, createOrder, updateOrderStatus } from './network/api';

function App() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const loadOrders = async () => {
            const orders = await fetchOrders();
            setOrders(orders);
        };
        loadOrders();
    }, []);

    const handleCreateOrder = async (type, amount, status) => {
        await createOrder(type, amount, status);
        const orders = await fetchOrders();
        setOrders(orders);
    };

    const handleUpdateOrderStatus = async (id, newStatus) => {
        await updateOrderStatus(id, newStatus);
        const orders = await fetchOrders();
        setOrders(orders);
    };

    return (
        <Container>
            <Box my={4}>
                <Typography variant="h3" component="h1" gutterBottom>
                    Trading System
                </Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <OrderForm onCreateOrder={handleCreateOrder} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <OrderChart orders={orders} />
                    </Grid>
                    <Grid item xs={12}>
                        <OrderList orders={orders} onUpdateStatus={handleUpdateOrderStatus} />
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

export default App;
