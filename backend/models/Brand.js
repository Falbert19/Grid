// Brand.js
const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
  name: String,
  description: String,
  logo: String,
});

module.exports = mongoose.model('Brand', brandSchema);