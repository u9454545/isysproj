// app.js

const express = require('express');
const db = require('./database'); // adjust path based on your folder structure
const app = express();
const mongoose = require('mongoose');
function connectDB() {
  mongoose.connect('mongodb://localhost/your-database-name', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
}

connectDB();

const port = 3000;





app.get('/', (req, res) => {
  res.sendFile('admin.html', { root: './views/templates' });
});

app.get('/cart', (req, res) => {
  res.sendFile('cart.html', { root: './views/templates' });
});
app.get('/orders', (req, res) => {
  res.sendFile('order.html', { root: './views/templates' });
});

app.get('/products', (req, res) => {
  res.sendFile('product.html', { root: './views/templates' });
});

app.get('/user', (req, res) => {
  res.sendFile('user.html', { root: './views/templates' });
});

const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

// Using the route modules 
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', orderRoutes);
app.use('/products', productRoutes);
app.use('/users', userRoutes);


app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
