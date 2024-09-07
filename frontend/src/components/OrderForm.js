import React, { useState } from 'react';

const OrderForm = ({ onCreateOrder }) => {
    const [type, setType] = useState('');
    const [amount, setAmount] = useState('');
    const [status, setStatus] = useState('pending');

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreateOrder(type, amount, status);
        setType('');
        setAmount('');
        setStatus('pending');
    };

    return (
        <form onSubmit={handleSubmit}>
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
            <button type="submit">Create Order</button>
        </form>
    );
};

export default OrderForm;