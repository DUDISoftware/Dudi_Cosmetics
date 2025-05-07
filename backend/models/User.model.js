const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  fullname: { type: String , unique: true, required: true },
  dateOfBirth: String,
  phone: { type: String , unique: true, required: true },
  address: String, 
  country: String,
  city: String,
  district: String,
  gender: String,
  email: { type: String , unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  status: String,
  created_at: { type: Date, default: Date.now }
});

userSchema.plugin(uniqueValidator, { message: "{PATH} đã tồn tại." });
module.exports = mongoose.model("User", userSchema);
