//backend/routes/userRoutes.js
const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const { route } = require('./productRoutes');
const router = express.Router();

router.get('/profile', verifyToken, (req, res) => {
    res.json({
        message: 'User profile data',
        user: req.user // Assuming req.user is set by verifyToken middleware
    });
});

module.exports = router;
