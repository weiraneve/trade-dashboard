import React from 'react';
import { List, ListItem, ListItemText, Typography, Button, Box } from '@mui/material';

const OrderList = ({ orders, onUpdateStatus }) => {
    if (orders.length === 0) {
        return (
            <Typography variant="h6" align="left">
                No orders available.
            </Typography>
        );
    }

    return (
        <Box mt={4}>
            <List>
                {orders.map((order) => (
                    <ListItem key={order.id} divider>
                        <ListItemText
                            primary={`${order.name} - ${order.amount}`}
                            secondary={`Status: ${order.status}`}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => onUpdateStatus(order.id, 'completed')}
                        >
                            Complete
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => onUpdateStatus(order.id, 'cancelled')}
                            style={{ marginLeft: '10px' }}
                        >
                            Cancel
                        </Button>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default OrderList;