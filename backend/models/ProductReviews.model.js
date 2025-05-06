const mongoose = require("mongoose");

const productReviewSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true },
  comment: String,
  status: { type: String, default: "pending" },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("ProductReview", productReviewSchema);
