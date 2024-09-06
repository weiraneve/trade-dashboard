import React from 'react';
import { Line } from 'react-chartjs-2';

const OrderChart = ({ orders }) => {
    const data = {
        labels: orders.map(order => new Date(order.createdAt).toLocaleTimeString()),
        datasets: [
            {
                label: 'Order Amount',
                data: orders.map(order => order.amount),
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };

    return <Line data={data} />;
};

export default OrderChart;