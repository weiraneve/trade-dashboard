import React from 'react';
import { List, ListItem, Typography, ListItemText, Button, Box } from '@mui/material';

const OrderList = ({ orders, onUpdateStatus }) => {
    return (
        <Box mt={4}>
            <Typography variant="h5" component="h2" gutterBottom>
                Orders
            </Typography>
            <List>
                {orders.map((order) => (
                    <ListItem key={order.id} divider>
                        <ListItemText
                            primary={`${order.type} - ${order.amount}`}
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