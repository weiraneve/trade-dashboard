import React, { useState } from 'react';
import { TextField, Button, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

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
        <Box component="form" onSubmit={handleSubmit} mt={4}>
            <TextField
                label="Type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                fullWidth
                margin="normal"
            />
            <FormControl fullWidth margin="normal">
                <InputLabel>Status</InputLabel>
                <Select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                    <MenuItem value="cancelled">Cancelled</MenuItem>
                </Select>
            </FormControl>
            <Button type="submit" variant="contained" color="primary" fullWidth>
                Create Order
            </Button>
        </Box>
    );
};

export default OrderForm;