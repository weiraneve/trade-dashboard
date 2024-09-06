import React, { useState, useEffect } from 'react';
import OrderChart from './components/OrderChart';

function App() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await fetch('/api/orders');
            const data = await response.json();
            setOrders(data);
        };

        fetchOrders();
    }, []);

    return (
        <div className="App">
            <h1>Trading System</h1>
            <OrderChart orders={orders} />
        </div>
    );
}

export default App;