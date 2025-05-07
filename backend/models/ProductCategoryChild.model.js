const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const productCategoryChildSchema = new mongoose.Schema({
  category_name: { type: String, unique: true, required: true },
  slug: { type: String, unique: true, required: true },
  parent_id: { type: mongoose.Schema.Types.ObjectId, ref: "ProductCategoryParent", required: true },
  status: String,
  created_at: { type: Date, default: Date.now }
});

productCategoryChildSchema.plugin(uniqueValidator, { message: "{PATH} đã tồn tại." });
module.exports = mongoose.model("ProductCategoryChild", productCategoryChildSchema);
