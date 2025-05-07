const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  cart_id: { type: mongoose.Schema.Types.ObjectId, ref: "Cart", required: true },
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  variant_id: Number,
  quantity: Number,
  price: Number,
  created_at: { type: Date, default: Date.now },
  updated_at: Date
});

module.exports = mongoose.model("CartItem", cartItemSchema);
