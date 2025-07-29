const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  cart_id: { type: mongoose.Schema.Types.ObjectId, ref: "Cart", required: true },
  order_code: { type: String, unique: true, required: true },
  order_payment_link_id: String,
  full_name: String,
  phone: String,
  city: String,
  district: String,
  ward: String,
  address: String,
  note: String,
  total_amount: Number,
  discount_amount: Number,
  final_amount: Number,
  voucher_code: String,
  payment_method: {
    type: String,
    enum: ["cod", "momo", "bank"],
    default: "cod",
  },
  status: {
    type: String,
    enum: ["PAID", "PENDING", "PROCESSING", "CANCELLED"],
    default: "PENDING",
  },
});

module.exports = mongoose.model("Order", orderSchema);
