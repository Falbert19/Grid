const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const User = require('../models/User');
const Product = require('../models/Product');

// Save product to favorites
router.post('/save/:productId', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user.saved.includes(req.params.productId)) {
      user.saved.push(req.params.productId);
      await user.save();
    }
    res.json({ message: 'Product saved to favorites' });
  } catch (err) {
    res.status(500).json({ message: 'Server error saving product' });
  }
});

// Add product to cart
router.post('/cart/:productId', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user.cart.includes(req.params.productId)) {
      user.cart.push(req.params.productId);
      await user.save();
    }
    res.json({ message: 'Product added to cart' });
  } catch (err) {
    res.status(500).json({ message: 'Server error adding to cart' });
  }
});

module.exports = router;
