// backend/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const { getAllProducts, updateProduct } = require('../controllers/productController');
const verifyToken = require('../middleware/verifyToken');

// Route to get all products
router.get('/', getAllProducts);

// Route to update a product
router.put('/:id', verifyToken, updateProduct); // Make sure updateProduct is defined and exported

module.exports = router;
