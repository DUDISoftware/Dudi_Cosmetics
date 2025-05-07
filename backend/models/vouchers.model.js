const mongoose = require("mongoose");

const voucherSchema = new mongoose.Schema({
  code: { type: String, unique: true, required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  quantity: { type: Number, required: true },
  used: { type: Number, default: 0 },
  discount_percentage: Number,
  max_discount_amount: Number
});

module.exports = mongoose.model("Voucher", voucherSchema);
