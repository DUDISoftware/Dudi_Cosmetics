const mongoose = require("mongoose");

const postCategorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true, required: true },
  status: String,
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("PostCategory", postCategorySchema);
