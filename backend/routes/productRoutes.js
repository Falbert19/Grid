// backend/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const Product = require('../models/Product');
const upload = require('../middleware/upload');
const cloudinary = require('cloudinary').v2;

// Setup Cloudinary config (ideally move to config file)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Create product with image upload
router.post('/', verifyToken, upload.single('image'), async (req, res) => {
  try {
    const { name, price, sizes, colors, stock } = req.body;

    const uploadRes = await cloudinary.uploader.upload_stream({ resource_type: 'image' }, async (error, result) => {
      if (error) return res.status(500).json({ error: 'Cloudinary upload failed' });

      const product = new Product({
        brand: req.user.id,
        name,
        image: result.secure_url,
        price,
        sizes: sizes.split(',').map(s => s.trim()),
        colors: colors.split(',').map(c => c.trim()),
        stock: parseInt(stock)
      });

      await product.save();
      res.status(201).json(product);
    });

    // Stream the buffer to Cloudinary
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: 'image' },
      (error, result) => {
        if (error) return res.status(500).json({ error: 'Cloudinary upload failed' });
        const product = new Product({
          brand: req.user.id,
          name,
          image: result.secure_url,
          price,
          sizes: sizes.split(',').map(s => s.trim()),
          colors: colors.split(',').map(c => c.trim()),
          stock: parseInt(stock)
        });
        product.save().then(saved => res.status(201).json(saved));
      }
    );

    stream.end(req.file.buffer);
  } catch (err) {
    console.error('Create product error:', err);
    res.status(500).json({ error: 'Product creation failed' });
  }
});
