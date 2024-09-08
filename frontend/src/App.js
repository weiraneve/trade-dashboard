import React, { useState, useEffect } from 'react';
import { Container, Box, Grid } from '@mui/material';
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

    const handleCreateOrder = async (name, amount, status) => {
        await createOrder(name, amount, status);
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
            <Box my={4} display="flex" flexDirection="column" alignItems="center">
                <Box mb={4} display="flex" justifyContent="center" width="100%">
                    <img
                        src="logo.svg"
                        alt="logo"
                        style={{
                            maxWidth: '200px',
                            height: 'auto',
                        }}
                    />
                </Box>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={10}>
                        <OrderList orders={orders} onUpdateStatus={handleUpdateOrderStatus} />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <OrderForm onCreateOrder={handleCreateOrder} />
                    </Grid>
                    <Grid item xs={12}>
                        <OrderChart orders={orders} />
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

export default App;
