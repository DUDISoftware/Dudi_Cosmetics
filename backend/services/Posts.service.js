const mongoose = require("mongoose");
const Posts = require("../models/Posts.model");
const PostCategory = require('../models/PostCategory.model');
const User = require('../models/User.model');
const cloudinary = require('../config/cloudinary.config');
const { updateImageOnCloudinary } = require('../utils/cloudinary.util');

// Tạo bài viết mới
exports.createPostSv = async (postData, file) => {
  try {
    let errors = [];

    if (!mongoose.Types.ObjectId.isValid(postData.CategoryP_id)) {
      errors.push("PostCategory_id không hợp lệ");
    } else {
      const categoryExists = await PostCategory.findById(postData.CategoryP_id);
      if (!categoryExists) {
        errors.push("PostCategory_id không tồn tại");
      }
    }

    if (!mongoose.Types.ObjectId.isValid(postData.user_id)) {
      errors.push("user_id không hợp lệ");
    } else {
      const userExists = await User.findById(postData.user_id);
      if (!userExists) {
        errors.push("user_id không tồn tại");
      }
    }

    if (errors.length > 0) {
      return {
        status: false,
        message: errors.join(", "),
      };
    }

    if (!file || !file.path) {
      return {
        status: false,
        message: "Thiếu file ảnh",
      };
    }

    const uploadResult = await cloudinary.uploader.upload(file.path, {
      folder: 'posts',
    });
    postData.image_url = uploadResult.secure_url;

    const post = new Posts(postData);
    const savedPost = await post.save();
    return {
      status: true,
      data: savedPost,
    };
  } catch (error) {
    if (error.name === "ValidationError") {
      return {
        status: false,
        message: Object.values(error.errors).map((err) => err.message).join(", "),
      };
    }
    throw new Error("Lỗi khi tạo bài viết: " + error.message);
  }
};

// Cập nhật bài viết
exports.updatePostSv = async (id, updateData, file) => {
  try {
    const post = await Posts.findById(id);
    if (!post) {
      throw new Error("Không tìm thấy bài viết");
    }

    if (file && file.path) {
      const oldPublicId = post.image_url.replace(/^.*\/upload\/(?:v\d+\/)?/, '').replace(/\.[^/.]+$/, '');
      const uploadResult = await updateImageOnCloudinary(
        oldPublicId,
        file.path,
        'posts'
      );
      updateData.image_url = uploadResult.secure_url;
    }

    return await Posts.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
  } catch (error) {
    throw new Error("Lỗi khi cập nhật bài viết: " + error.message);
  }
};

// Xóa bài viết
exports.deletePostSv = async (id) => {
  try {
    const post = await Posts.findById(id);
    if (!post) {
      throw new Error("Không tìm thấy bài viết");
    }

    const oldPublicId = post.image_url.replace(/^.*\/upload\/(?:v\d+\/)?/, '').replace(/\.[^/.]+$/, '');
    await cloudinary.uploader.destroy(oldPublicId, { invalidate: true });

    return await Posts.findByIdAndDelete(id);
  } catch (error) {
    throw new Error("Lỗi khi xóa bài viết: " + error.message);
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

exports.getPostBySlugSv = async (slug) => {
  try {
    return await Posts.findOne({ slug });
  } catch (error) {
    throw new Error("Lỗi khi lấy chi tiết bài viết theo slug: " + error.message);
  }
};