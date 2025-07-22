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
    if (!user.cartItems.includes(req.params.productId)) {
      user.cartItems.push(req.params.productId);
      await user.save();
    }
    res.json({ message: 'Item added to cart' });
  } catch (err) {
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
router.get('/cart', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('cartItems');
    res.json(user.cartItems);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cart items' });
  }
});

module.exports = router;
