const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  slug: { type: String, unique: true, required: true },
  description: String,
  content: String,
  image_url: String,
  status: String,
  CategoryP_id: { type: mongoose.Schema.Types.ObjectId, ref: "PostCategory", required: true },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Post", postSchema);
