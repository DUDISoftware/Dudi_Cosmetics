const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: String,
  created_at: { type: Date, default: Date.now },
  updated_at: Date
});

module.exports = mongoose.model("Cart", cartSchema);
