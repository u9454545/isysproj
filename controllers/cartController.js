// Import necessary modules and models
const Cart = require('../models/cartModel');
const path = require('path');


// Controller functions for managing the shopping cart

// Add a product to the shopping cart
const addToCart = (req, res) => {
  const productId = req.params.productId; 
  const quantity = parseInt(req.body.quantity); 

  // Check if the product exists in the cart
  Cart.findOne({ user: req.params.id }) 
    .then((cart) => {
      if (!cart) {
        // If the user doesn't have a cart yet, create a new cart
        const newCart = new Cart({
          user:req.params.id,
          items: [{ product: productId, quantity: quantity }],
        });

        newCart.save()
          .then(() => res.status(201).json({ message: 'Product added to cart' }))
          .catch((err) => res.status(500).json({ error: err.message }));
      } else {
        // If the user already has a cart, update it
        const itemIndex = cart.items.findIndex(item => item.product === productId);

        if (itemIndex !== -1) {
          // If the product is already in the cart, update its quantity
          cart.items[itemIndex].quantity += quantity;
        } else {
          // If the product is not in the cart, add it as a new item
          cart.items.push({ product: productId, quantity: quantity });
        }

        cart.save()
          .then(() => res.status(200).json({ message: 'Product added to cart' }))
          .catch((err) => res.status(500).json({ error: err.message }));
      }
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};

// Update the shopping cart
const updateCart = (req, res) => {
  const productId = req.params.productId; 
  const quantity = parseInt(req.body.quantity); 

  // Find the user's cart
  Cart.findOne({ user: req.params.id }) 
    .then((cart) => {
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }

      // Find the item in the cart
      const itemIndex = cart.items.findIndex(item => item.product === productId);

      if (itemIndex !== -1) {
        // If the product is in the cart, update its quantity
        cart.items[itemIndex].quantity = quantity;

        cart.save()
          .then(() => res.status(200).json({ message: 'Cart updated' }))
          .catch((err) => res.status(500).json({ error: err.message }));
      } else {
        return res.status(404).json({ message: 'Product not found in the cart' });
      }
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};

// Remove a product from the shopping cart
const removeFromCart = (req, res) => {
  const productId = req.params.productId; 

  // Find the user's cart
  Cart.findOne({ user: req.params.id }) 
    .then((cart) => {
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }

      // Find the item in the cart
      const itemIndex = cart.items.findIndex(item => item.product === productId);

      if (itemIndex !== -1) {
        // If the product is in the cart, remove it
        cart.items.splice(itemIndex, 1);

        cart.save()
          .then(() => res.status(200).json({ message: 'Product removed from cart' }))
          .catch((err) => res.status(500).json({ error: err.message }));
      } else {
        return res.status(404).json({ message: 'Product not found in the cart' });
      }
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};
const getCart = (req, res) => {
  console.log("i am here in get cart")
  console.log(req.params.id)
  const userId = req.params.id;
  Cart.findOne({user: userId }) 
    .then((cart) => {
      if (!cart) {
        console.log("inside cart not found");
        return res.status(404).json({ message: 'Cart not found' });
      }
      console.log("outside cart not found");

     
      const filePath = path.join(__dirname, '../views/templates/cart.html');

      // Use res.sendFile to send the 'cart.html' file as the response
      res.sendFile(filePath);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};


// Export the cart controller
module.exports = {
  getCart,
  addToCart,
  updateCart,
  removeFromCart,
};