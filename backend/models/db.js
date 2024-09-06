const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

let connection;

const createConnection = async () => {
    connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });
    console.log('MySQL connected');
};

const getConnection = () => connection;

module.exports = { createConnection, getConnection };