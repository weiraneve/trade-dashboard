import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import orderRoutes from './routes/order.js';
import sequelize from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());
app.use('/', orderRoutes);

sequelize.authenticate()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('无法连接到数据库:', err);
    });