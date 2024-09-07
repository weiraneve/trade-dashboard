export const fetchOrders = async () => {
    try {
        const response = await fetch('/api/orders');
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

export const createOrder = async (type, amount, status) => {
    try {
        const response = await fetch('/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ type, amount, status }),
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
        const response = await fetch(`/api/orders/${id}`, {
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