//models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String } // optional, if you added it
});

module.exports = mongoose.model('User', userSchema);
