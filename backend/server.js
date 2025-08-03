//server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const connectDB = require('./config/db');

//loads env vars
dotenv.config();
connectDB();

//Log MongoDB connection errors
mongoose.connection.on('connected', () => {
    console.log('MongoDB connected successfully');
});

mongoose.connection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err.message}`);
});

const app = express();

//log all incoming requests
app.use((req, res, next) => {
    console.log(` ${req.method}${req.originalUrl}`);
    next();
});

//middleware
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/brands', require('./routes/brandRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/user', require('./routes/userRoutes'));

//test environment variables
app.get('/api/test-env', (req, res) => {
  res.json({
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || 'Not loaded',
    mongoURI: process.env.MONGO_URI ? 'Loaded' : 'Not loaded',
    jwt: process.env.JWT_SECRET ? 'Loaded' : 'Not loaded'
  });
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Export the app for testing
module.exports = app;
