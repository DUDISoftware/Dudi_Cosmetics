const mongoose = require("mongoose");

const productBrandSchema = new mongoose.Schema({
  Brand_name: { type: String, required: true },
  slug: { type: String, unique: true, required: true },
  status: String,
  image_url: String,
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("ProductBrand", productBrandSchema);
