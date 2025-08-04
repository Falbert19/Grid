// backend/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const Product = require('../models/Product');
const {
  getAllProducts,
  updateProduct
} = require('../controllers/productController');

//get all products
router.get('/', getAllProducts);

router.put('/:id', verifyToken, updateProduct);

// Create product
router.post('/', verifyToken, async (req, res) => {
  try {
    console.log("Incoming product data:", req.body);  // <-- ADD THIS

    const { name, image, price, sizes, colors, stock } = req.body;

    if (!image) return res.status(400).json({ error: 'Image URL is required' });

    const product = new Product({
      brand: req.user._id || req.user.id,
      name,
      image,
      price,
      sizes,
      colors,
      stock
    });

    await product.save();
    console.log("Product saved:", product);  // <-- OPTIONAL
    res.status(201).json(product);
  } catch (err) {
    console.error('Create product error:', err);
    res.status(500).json({ error: 'Product creation failed' });
  }
});

module.exports = router;
