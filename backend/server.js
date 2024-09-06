const express = require('express');
const mongoose = require('mongoose');
const orderRoutes = require('./routes/orders');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/orders', orderRoutes);

mongoose.connect('mongodb://localhost:27017/trading', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});