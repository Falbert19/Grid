// backend/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const upload = multer({ storage });
const Product = require('../models/Product');

// POST /api/products with image
router.post('/', verifyToken, upload.single('image'), async (req, res) => {
  try {
    const { name, price, sizes, colors, stock } = req.body;

    const newProduct = new Product({
      brand: req.user.id,
      name,
      image: req.file.path, // Cloudinary URL
      price,
      sizes: sizes.split(',').map(s => s.trim()),
      colors: colors.split(',').map(c => c.trim()),
      stock: parseInt(stock)
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Upload failed' });
  }
});

module.exports = router;
