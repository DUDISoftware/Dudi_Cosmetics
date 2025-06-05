const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const postSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, unique: true, required: true },
  slug: { type: String, required: true },
  description: String,
  content: String,
  image_url: String,
  status: String,
  CategoryP_id: { type: mongoose.Schema.Types.ObjectId, ref: "PostCategory", required: true },
  created_at: { type: Date, default: Date.now }
});

postSchema.plugin(uniqueValidator, { message: "{PATH} đã tồn tại." });
module.exports = mongoose.model("Post", postSchema);
