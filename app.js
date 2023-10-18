// app.js

const express = require('express');
const app = express();
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
