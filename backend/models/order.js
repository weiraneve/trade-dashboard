const { getConnection } = require('../config/db');

const createOrder = async (type, amount, status) => {
    const connection = getConnection();
    const [result] = await connection.execute(
        'INSERT INTO orders (type, amount, status) VALUES (?, ?, ?)',
        [type, amount, status]
    );
    return result.insertId;
};

const updateOrderStatus = async (id, status) => {
    const connection = getConnection();
    const [result] = await connection.execute(
        'UPDATE orders SET status = ? WHERE id = ?',
        [status, id]
    );
    return result.affectedRows;
};

const getOrderById = async (id) => {
    const connection = getConnection();
    const [rows] = await connection.execute(
        'SELECT * FROM orders WHERE id = ?',
        [id]
    );
    return rows[0];
};

const getAllOrders = async () => {
    const connection = getConnection();
    const [rows] = await connection.execute('SELECT * FROM orders');
    return rows;
};

module.exports = { createOrder, updateOrderStatus, getOrderById, getAllOrders };