const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const productSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  product_name: { type: String, unique: true, required: true },
  slug: { type: String, required: true },
  short_description: String,
  long_description: String,
  is_hot: { type: Boolean, default: false },
  is_most_viewed: { type: Boolean, default: false },
  status: String,
  base_price: Number,
  image_url: String,
  sub_images_urls: [String],
  store_quantity: Number,
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: "ProductCategoryChild", required: true },
  brand_id: { type: mongoose.Schema.Types.ObjectId, ref: "ProductBrand", required: true },
  created_at: { type: Date, default: Date.now }
});

productSchema.plugin(uniqueValidator, { message: "{PATH} đã tồn tại." });
module.exports = mongoose.model("Product", productSchema);
