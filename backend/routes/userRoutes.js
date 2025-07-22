const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const User = require('../models/User');
const Product = require('../models/Product');

// Save an item
router.post('/save/:productId', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user.savedItems.includes(req.params.productId)) {
      user.savedItems.push(req.params.productId);
      await user.save();
    }
    res.json({ message: 'Item saved' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save item' });
  }
});

// Add to cart
router.post('/cart/:productId', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    // Find existing cart item
    const existingItem = user.cartItems.find(item => item.product.toString() === req.params.productId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cartItems.push({ product: req.params.productId, quantity: 1 });
    }

    await user.save();
    res.json({ message: 'Item added to cart' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
});


// Get saved items
router.get('/saved', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('savedItems');
    res.json(user.savedItems);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch saved items' });
  }
});

// Get cart items
// routes/userRoutes.js
router.get('/cart', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('cartItems.product');
    res.json(user.cartItems);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cart items' });
  }
});


// Remove from saved
router.delete('/unsave/:productId', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.savedItems.pull(req.params.productId);
    await user.save();
    res.json({ message: 'Item removed from saved items' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove saved item' });
  }
});

// Remove from cart
router.delete('/remove-cart/:productId', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.cartItems.pull(req.params.productId);
    await user.save();
    res.json({ message: 'Item removed from cart' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove cart item' });
  }
});


module.exports = router;
