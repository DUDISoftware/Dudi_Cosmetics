const mongoose = require("mongoose");

const productCategoryParentSchema = new mongoose.Schema({
  category_name: { type: String, required: true },
  slug: { type: String, unique: true, required: true },
  status: String,
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("ProductCategoryParent", productCategoryParentSchema);
