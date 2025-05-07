const mongoose = require("mongoose");
const ProductCategoryChild = require('../models/ProductCategoryChild.model');
const ProductCategoryParent = require('../models/ProductCategoryParent.model'); // Import model cha

// Tạo danh mục con mới
exports.createPCChildSv = async (childData) => {
  try {
    // Kiểm tra xem parent_id có tồn tại không
    if (!mongoose.Types.ObjectId.isValid(childData.parent_id)) {
      throw new Error("parent_id không hợp lệ");
    }

    const parentExists = await ProductCategoryParent.findById(childData.parent_id);
    if (!parentExists) {
      throw new Error("parent_id không tồn tại");
    }

    // Tạo danh mục con
    const child = new ProductCategoryChild(childData);
    return await child.save();
  } catch (error) {
    // Kiểm tra lỗi unique
    if (error.name === "ValidationError") {
      throw new Error(Object.values(error.errors).map(err => err.message).join(", "));
    }
    throw new Error(error.message);
  }
};

// Lấy tất cả danh mục con
exports.getAllPCChildSv = async (filters = {}) => {
  try {
    return await ProductCategoryChild.find(filters);
  } catch (error) {
    throw new Error("Lỗi khi lấy danh sách danh mục con: " + error.message);
  }
};

// Lấy chi tiết danh mục con
exports.getPCChildByIdSv = async (id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("ID không hợp lệ");
    }
    return await ProductCategoryChild.findById(id);
  } catch (error) {
    throw new Error("Lỗi khi lấy chi tiết danh mục con: " + error.message);
  }
};

// Cập nhật danh mục con
exports.updatePCChildSv = async (id, updateData) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("ID không hợp lệ");
    }
    return await ProductCategoryChild.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
  } catch (error) {
    throw new Error("Lỗi khi cập nhật danh mục con: " + error.message);
  }
};

// Xóa danh mục con
exports.deletePCChildSv = async (id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("ID không hợp lệ");
    }
    return await ProductCategoryChild.findByIdAndDelete(id);
  } catch (error) {
    throw new Error("Lỗi khi xóa danh mục con: " + error.message);
  }
};