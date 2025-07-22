//models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  savedItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  cartItems: [{
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantity: { type: Number, default: 1 }
}]
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
