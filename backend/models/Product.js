// backend/models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand' },
  name: String,
  image: String,
  price: Number,
  sizes: [String],
  colors: [String],
  stock: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', productSchema);
