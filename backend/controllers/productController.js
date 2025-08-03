// backend/controllers/productController.js
const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('brand');
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { sizes, colors, stock } = req.body;

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { sizes, colors, stock },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Product not found' });

    res.json({ message: 'Product updated', product: updated });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
