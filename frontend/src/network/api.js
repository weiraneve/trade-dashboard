const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000';

export const fetchOrders = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/orders`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.map(order => ({
            ...order,
            createdAt: new Date(order.createdAt),
            updatedAt: new Date(order.updatedAt)
        }));
    } catch (error) {
        console.error('Failed to fetch orders:', error);
        return [];
    }
};

export const createOrder = async (name, amount, status) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, amount, status }),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('Failed to create order:', error);
    }
};

export const updateOrderStatus = async (id, newStatus) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/orders/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: newStatus }),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('Failed to update order status:', error);
    }
};