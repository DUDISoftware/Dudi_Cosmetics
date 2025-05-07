const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  order_code: { type: String, unique: true, required: true },
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
  payment_method: String,
  status: String
});

module.exports = mongoose.model("Order", orderSchema);
