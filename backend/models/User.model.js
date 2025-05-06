const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullname: String,
  dateOfBirth: String,
  phone: String,
  address: String, 
  country: String,
  city: String,
  district: String,
  gender: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  role: { type: String, enum: ['user', 'admin'], default: 'user' },
});

module.exports = mongoose.model("User", userSchema);
