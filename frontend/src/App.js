import React, { useState, useEffect } from 'react';
import OrderChart from './components/OrderChart';
import OrderList from './components/OrderList';
import OrderForm from './components/OrderForm';
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
        <div className="App">
            <h1>Trading System</h1>
            <OrderForm onCreateOrder={handleCreateOrder} />
            <OrderChart orders={orders} />
            <OrderList orders={orders} onUpdateStatus={handleUpdateOrderStatus} />
        </div>
    );
}

export default App;
