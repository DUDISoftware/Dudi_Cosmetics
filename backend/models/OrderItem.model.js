const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  order_id: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  variant_id: Number,
  product_name: String,
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  total_price: { type: Number, required: true }
});

module.exports = mongoose.model("OrderItem", orderItemSchema);
