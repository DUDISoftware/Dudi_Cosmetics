const Product = require('../models/Product.model');


// Tạo ProductCategoryChild mới
exports.createPCChild = async (productData) => {
  try {
    const product = new Product(productData);
    return await product.save();
  } catch (error) {
    throw new Error("Lỗi khi tạo sản phẩm: " + error.message);
  }
};

// Lấy tất cả ProductCategoryChild
exports.getAllPCChild= async (filters = {}) => {
  try {
    return await Product.find(filters)
      .populate('category_id', 'name')
      .populate('brand_id', 'name')
      .populate('user_id', 'name email');
  } catch (error) {
    throw new Error("Lỗi khi lấy danh sách sản phẩm: " + error.message);
  }
};

// Lấy chi tiết ProductCategoryChild
exports.getPCChildById = async (id) => {
  try {
    return await Product.findById(id)
      .populate('category_id')
      .populate('brand_id')
      .populate('user_id');
  } catch (error) {
    throw new Error("Lỗi khi lấy chi tiết sản phẩm: " + error.message);
  }
};

// Cập nhật ProductCategoryChild
exports.updatePCChild = async (id, updateData) => {
  try {
    return await Product.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
  } catch (error) {
    throw new Error("Lỗi khi cập nhật sản phẩm: " + error.message);
  }
};

// Xóa ProductCategoryChild
exports.deletePCChild = async (id) => {
  try {
    return await Product.findByIdAndDelete(id);
  } catch (error) {
    throw new Error("Lỗi khi xóa sản phẩm: " + error.message);
  }
};

