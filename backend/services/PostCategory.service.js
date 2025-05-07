const PostCategory = require('../models/PostCategory.model');

// Tạo loại bài viết mới
exports.createCategoryPostSv = async (categoryData) => {
  try {
    const category = new PostCategory(categoryData);
    return await category.save();
  } catch (error) {
    // Kiểm tra lỗi unique
    if (error.name === "ValidationError") {
      throw new Error(Object.values(error.errors).map(err => err.message).join(", "));
    }
    throw new Error("Lỗi khi tạo loại bài viết: " + error.message);
  }
};

// Lấy tất cả loại bài viết
exports.getAllCategoryPostSv = async (filters = {}) => {
  try {
    return await PostCategory.find(filters);
  } catch (error) {
    throw new Error("Lỗi khi lấy danh sách loại bài viết: " + error.message);
  }
};

// Lấy chi tiết loại bài viết
exports.getCategoryPostSByIdSv = async (id) => {
  try {
    return await PostCategory.findById(id);
  } catch (error) {
    throw new Error("Lỗi khi lấy chi tiết loại bài viết: " + error.message);
  }
};

// Cập nhật loại bài viết
exports.updateCategoryPostSv = async (id, updateData) => {
  try {
    return await PostCategory.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
  } catch (error) {
    throw new Error("Lỗi khi cập nhật loại bài viết: " + error.message);
  }
};

// Xóa loại bài viết
exports.deleteCategoryPostSv = async (id) => {
  try {
    return await PostCategory.findByIdAndDelete(id);
  } catch (error) {
    throw new Error("Lỗi khi xóa loại bài viết: " + error.message);
  }
};