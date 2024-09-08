const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const orderRoutes = require('./routes/orders');
const { createConnection } = require('./config/db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());
app.use('/', orderRoutes);

createConnection()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Failed to connect to the database:', err);
    });