import React, { useState, useEffect } from 'react';
import OrderChart from './components/OrderChart';

function App() {
    const [orders, setOrders] = useState([]);
    const [type, setType] = useState('');
    const [amount, setAmount] = useState('');
    const [status, setStatus] = useState('pending');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/orders');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data);
            setOrders(data);
        } catch (error) {
            console.error('Failed to fetch orders:', error);
        }
    };

    const createOrder = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ type, amount, status }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            fetchOrders();
        } catch (error) {
            console.error('Failed to create order:', error);
        }
    };

    const updateOrderStatus = async (id, newStatus) => {
        try {
            const response = await fetch(`http://localhost:4000/api/orders/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            fetchOrders();
        } catch (error) {
            console.error('Failed to update order status:', error);
        }
    };

    return (
        <div className="App">
            <h1>Trading System</h1>
            <div>
                <input
                    type="text"
                    placeholder="Type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                </select>
                <button onClick={createOrder}>Create Order</button>
            </div>
            <OrderChart orders={orders} />
            <div>
                <h2>Orders</h2>
                <ul>
                    {orders.map((order) => (
                        <li key={order.id}>
                            {order.type} - {order.amount} - {order.status}
                            <button onClick={() => updateOrderStatus(order.id, 'completed')}>Complete</button>
                            <button onClick={() => updateOrderStatus(order.id, 'cancelled')}>Cancel</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default App;
