const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const bannerSchema = new mongoose.Schema({
  title: { type: String, unique: true, required: true },
  description: String,
  image: String,
  status: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now },
  updated_at: Date
});

bannerSchema.plugin(uniqueValidator, { message: "{PATH} đã tồn tại." });
module.exports = mongoose.model("Banner", bannerSchema);
