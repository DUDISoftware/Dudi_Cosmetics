const mongoose = require("mongoose");

const productCategoryChildSchema = new mongoose.Schema({
  category_name: { type: String, required: true },
  slug: { type: String, unique: true, required: true },
  parent_id: { type: mongoose.Schema.Types.ObjectId, ref: "ProductCategoryParent", required: true },
  status: String,
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("ProductCategoryChild", productCategoryChildSchema);
