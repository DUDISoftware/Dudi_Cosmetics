const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  cart_id: { type: mongoose.Schema.Types.ObjectId, ref: "Cart", required: true },
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  product_name: { type: String, required: true },
  product_image: { type: String },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 },
}, {
  timestamps: true,
});

module.exports = mongoose.model("CartItem", cartItemSchema);
