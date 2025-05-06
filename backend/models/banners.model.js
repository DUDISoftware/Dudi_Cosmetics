const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  image: String,
  status: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now },
  updated_at: Date
});

module.exports = mongoose.model("Banner", bannerSchema);
