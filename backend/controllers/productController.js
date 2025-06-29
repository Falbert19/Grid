// productContorller.js
const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
  try {
    console.log('🔍 [GET] /api/products hit');
    const products = await Product.find().populate('brand');
    console.log('✅ Returning products:', products.length);
    res.json(products);
  } catch (err) {
    console.error('❌ Error in getAllProducts:', err.message);
    res.status(500).json({ error: 'Something went wrong' });
  }
};