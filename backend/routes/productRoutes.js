// backend/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const { getAllProducts } = require('../controllers/productController');

router.get('/test', (req, res) => {
  console.log(' /api/products/test route hit');
  res.send(' Product route is working');
});

router.get('/', getAllProducts);

module.exports = router;