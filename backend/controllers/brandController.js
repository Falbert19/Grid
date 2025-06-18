// backend/controllers/brandController.js
const Brand = require('../models/Brand');

exports.getAllBrands = async (req, res) => {
  const brands = await Brand.find();
  res.json(brands);
};
