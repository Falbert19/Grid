// server.js (entry point for the application)
const express = require('express'); // creates web server and handles routing
const cors = require('cors'); // allows cross-origin requests
const dotenv = require('dotenv'); 
const connectDB = require('./config/db');

dotenv.config();
connectDB();

// set up express
const app = express();
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/brands', require('./routes/brandRoutes'));

app.get('/', (req, res) => {
  res.send('API is running');
});

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));