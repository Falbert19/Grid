// backend/routes/brandRoutes.js
const express = require('express');
const router = express.Router();
const { getAllBrands } = require('../controllers/brandController');

router.get('/', getAllBrands);

module.exports = router;