const mongoose = require("mongoose");
const Posts = require("../models/Posts.model");
const PostCategory = require('../models/PostCategory.model');
const User = require('../models/User.model');

// Tạo bài viết mới
exports.createPostSv = async (postData) => {
  try {
    let errors = [];

    // Kiểm tra và chuyển đổi CategoryP_id
    if (!mongoose.Types.ObjectId.isValid(postData.CategoryP_id)) {
      errors.push("PostCategory_id không tồn tại");
    } else {
      const categoryExists = await PostCategory.findById(postData.CategoryP_id);
      if (!categoryExists) {
        errors.push("PostCategory_id không tồn tại");
      }
    }

    // Kiểm tra và chuyển đổi user_id
    if (!mongoose.Types.ObjectId.isValid(postData.user_id)) {
      errors.push("user_id không tồn tại");
    } else {
      const userExists = await User.findById(postData.user_id);
      if (!userExists) {
        errors.push("user_id không tồn tại");
      }
    }

    // Nếu có lỗi, trả về thông báo lỗi
    if (errors.length > 0) {
      return {
        status: false,
        message: errors.join(", "),
      };
    }

    // Tạo bài viết mới
    const post = new Posts(postData);
    const savedPost = await post.save();
    return {
      status: true,
      data: savedPost,
    };
  } catch (error) {
    // Kiểm tra lỗi unique
    if (error.name === "ValidationError") {
      return {
        status: false,
        message: Object.values(error.errors)
          .map((err) => err.message)
          .join(", "),
      };
    }

    throw new Error("Lỗi khi tạo bài viết: " + error.message);
  }
};

// Lấy tất cả bài viết
exports.getAllPostSv = async (filters = {}) => {
    try {
        return await Posts.find(filters);
    } catch (error) {
        throw new Error("Lỗi khi lấy danh sách bài viết: " + error.message);
    }
};

// Lấy chi tiết bài viết
exports.getPostSByIdSv = async (id) => {
  try {
    return await Posts.findById(id);
  } catch (error) {
    throw new Error("Lỗi khi lấy chi tiết bài viết: " + error.message);
  }
};

// Cập nhật bài viết
exports.updatePostSv = async (id, updateData) => {
    try {
        return await Posts.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });
    } catch (error) {
        throw new Error("Lỗi khi cập nhật bài viết: " + error.message);
    }
};

// Xóa bài viết
exports.deletePostSv = async (id) => {
    try {
        return await Posts.findByIdAndDelete(id);
    } catch (error) {
        throw new Error("Lỗi khi xóa bài viết: " + error.message);
    }
};
