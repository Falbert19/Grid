// backend/routes/brandRoutes.js
const express = require('express');
const router = express.Router();
const Brand = require('../models/Brand'); // assuming you created a Brand model

// Create new brand
router.post('/', async (req, res) => {
  try {
    const { name, email } = req.body;
    const newBrand = await Brand.create({ name, email });
    res.status(201).json(newBrand);
  } catch (err) {
    console.error("Brand creation error:", err);
    res.status(500).json({ error: "Failed to create brand" });
  }
});

// Get brand profile
router.get('/:id', async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) return res.status(404).json({ error: "Brand not found" });
    res.json(brand);
  } catch (err) {
    res.status(500).json({ error: "Error fetching brand" });
  }
});

module.exports = router;
