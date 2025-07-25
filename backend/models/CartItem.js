// backend/models/SavedItem.js
const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, default: 1 },
  selectedSize: String,
  selectedColor: String,
  addedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('CartItem', cartItemSchema);
