const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const postCategorySchema = new mongoose.Schema({
  title: { type: String, unique: true, required: true },
  slug: { type: String, unique: true, required: true },
  status: String,
  created_at: { type: Date, default: Date.now }
});

postCategorySchema.plugin(uniqueValidator, { message: "{PATH} đã tồn tại." });
module.exports = mongoose.model("PostCategory", postCategorySchema);
