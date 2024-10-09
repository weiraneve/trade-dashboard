import { getConnection } from '../config/db';

const createOrder = async (name, amount, status) => {
    const connection = getConnection();
    const [result] = await connection.execute(
        'INSERT INTO orders (name, amount, status) VALUES (?, ?, ?)',
        [name, amount, status]
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

export { createOrder, updateOrderStatus, getOrderById, getAllOrders };