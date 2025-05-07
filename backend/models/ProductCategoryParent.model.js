const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const productCategoryParentSchema = new mongoose.Schema({
  category_name: { type: String, unique: true, required: true },
  slug: { type: String, unique: true, required: true },
  status: String,
  created_at: { type: Date, default: Date.now }
});

productCategoryParentSchema.plugin(uniqueValidator, { message: "{PATH} đã tồn tại." });
module.exports = mongoose.model("ProductCategoryParent", productCategoryParentSchema);
