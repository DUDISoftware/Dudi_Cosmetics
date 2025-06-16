// models/carts.model.js
const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Cart", CartSchema);
