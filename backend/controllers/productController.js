// productContorller.js
const res = require('express/lib/response');
const Product = require('../models/Product');

export.getAllProducts = async (req, res) => {
    const products = await Product.find().populate('brand').sort({ createdAt: -1 });
    res.json(products);
};