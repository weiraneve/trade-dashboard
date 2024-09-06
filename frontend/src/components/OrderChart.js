import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const OrderChart = ({ orders }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.destroy();
        }

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

        const ctx = document.getElementById('orderChart').getContext('2d');
        chartRef.current = new Chart(ctx, {
            type: 'line',
            data: data,
        });

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [orders]);

    return <canvas id="orderChart"></canvas>;
};

export default OrderChart;