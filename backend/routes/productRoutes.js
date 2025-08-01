// backend/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const Product = require('../models/Product');
const multer = require('multer');
const path = require('path');

// Storage for image files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// Create product (brand only)
router.post('/', verifyToken, async (req, res) => {
  try {
    const { name, image, price, sizes, colors, stock } = req.body;

    const newProduct = new Product({
      brand: req.user.id,
      name,
      image,
      price,
      sizes,
      colors,
      stock
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error('Create product error:', err);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

module.exports = router;