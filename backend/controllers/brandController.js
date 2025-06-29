// backend/controllers/brandController.js
const Brand = require('../models/Brand');

exports.getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.find();
    res.json(brands);
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};