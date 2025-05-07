const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const productBrandSchema = new mongoose.Schema({
  Brand_name: { type: String, unique: true,  required: true },
  slug: { type: String, unique: true, required: true },
  status: String ,
  image_url: String,
  created_at: { type: Date, default: Date.now }
});

productBrandSchema.plugin(uniqueValidator, { message: "{PATH} đã tồn tại." });
module.exports = mongoose.model("ProductBrand", productBrandSchema);