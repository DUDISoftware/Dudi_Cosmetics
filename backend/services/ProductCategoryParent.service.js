const ProductCategoryParent = require('../models/ProductCategoryParent.model');

// Tạo danh mục sản phẩm cha mới
exports.createPCParentSv = async (categoryData) => {
  try {
    const category = new ProductCategoryParent(categoryData);
    return await category.save();
  } catch (error) {
    // Kiểm tra lỗi unique
    if (error.name === "ValidationError") {
      throw new Error(Object.values(error.errors).map(err => err.message).join(", "));
    }
    throw new Error("Lỗi khi tạo danh mục sản phẩm cha: " + error.message);
  }
};

// Lấy tất cả danh mục sản phẩm cha
exports.getAllPCParentSv = async (filters = {}) => {
  try {
    return await ProductCategoryParent.find(filters);
  } catch (error) {
    throw new Error("Lỗi khi lấy danh sách danh mục sản phẩm cha: " + error.message);
  }
};

// Lấy chi tiết danh mục sản phẩm cha
exports.getPCParentsvByIdSv = async (id) => {
  try {
    return await ProductCategoryParent.findById(id);
  } catch (error) {
    throw new Error("Lỗi khi lấy chi tiết danh mục sản phẩm cha: " + error.message);
  }
};

// Cập nhật danh mục sản phẩm cha
exports.updatePCParentSv = async (id, updateData) => {
  try {
    return await ProductCategoryParent.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
  } catch (error) {
    throw new Error("Lỗi khi cập nhật danh mục sản phẩm cha: " + error.message);
  }
};

// Xóa danh mục sản phẩm cha
exports.deletePCParentSv = async (id) => {
  try {
    return await ProductCategoryParent.findByIdAndDelete(id);
  } catch (error) {
    throw new Error("Lỗi khi xóa danh mục sản phẩm cha: " + error.message);
  }
};