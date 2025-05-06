const Product = require('../models/ProductCategoryParent.model');



// Tạo ProductCategoryParent mới
exports.createPCParent = async (productData) => {
  try {
    const product = new Product(productData);
    return await product.save();
  } catch (error) {
    throw new Error("Lỗi khi tạo sản phẩm: " + error.message);
  }
};

// Lấy tất cả ProductCategoryParent
exports.getAllPCParent = async (filters = {}) => {
  try {
    return await Product.find(filters)
      .populate('category_id', 'name')
      .populate('brand_id', 'name')
      .populate('user_id', 'name email');
  } catch (error) {
    throw new Error("Lỗi khi lấy danh sách sản phẩm: " + error.message);
  }
};

// Lấy chi tiết ProductCategoryParent
exports.getPCParentById = async (id) => {
  try {
    return await Product.findById(id)
      .populate('category_id')
      .populate('brand_id')
      .populate('user_id');
  } catch (error) {
    throw new Error("Lỗi khi lấy chi tiết sản phẩm: " + error.message);
  }
};

// Cập nhật ProductCategoryParent
exports.updatePCParent = async (id, updateData) => {
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

// Xóa sản ProductCategoryParent
exports.deletePCParent = async (id) => {
  try {
    return await Product.findByIdAndDelete(id);
  } catch (error) {
    throw new Error("Lỗi khi xóa sản phẩm: " + error.message);
  }
};

