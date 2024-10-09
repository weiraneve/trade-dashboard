import React, { useState, useEffect } from 'react';
import { Container, Box, Grid } from '@mui/material';
import OrderList from './components/OrderList';
import OrderForm from './components/OrderForm';
import OrderChart from './components/OrderChart';
import { fetchOrder, createOrder, updateOrdertatus } from './network/api';

function App() {
    const [order, setOrder] = useState([]);

    useEffect(() => {
        const loadOrder = async () => {
            const order = await fetchOrder();
            setOrder(order);
        };
        loadOrder();
    }, []);

    const handleCreateOrder = async (name, amount, status) => {
        await createOrder(name, amount, status);
        const order = await fetchOrder();
        setOrder(order);
    };

    const handleUpdateOrdertatus = async (id, newStatus) => {
        await updateOrdertatus(id, newStatus);
        const order = await fetchOrder();
        setOrder(order);
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
                        <OrderList order={order} onUpdateStatus={handleUpdateOrdertatus} />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <OrderForm onCreateOrder={handleCreateOrder} />
                    </Grid>
                    <Grid item xs={12}>
                        <OrderChart order={order} />
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

export default App;
