import React from 'react';

const OrderList = ({ orders, onUpdateStatus }) => {
    return (
        <div>
            <h2>Orders</h2>
            <ul>
                {orders.map((order) => (
                    <li key={order.id}>
                        {order.type} - {order.amount} - {order.status}
                        <button onClick={() => onUpdateStatus(order.id, 'completed')}>Complete</button>
                        <button onClick={() => onUpdateStatus(order.id, 'cancelled')}>Cancel</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrderList;