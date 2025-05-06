const ProductBrand = require('../models/ProductBrand.model');

// Tạo thương hiệu sản phẩm mới
exports.createProductBrand = async (brandData) => {
  try {
    const brand = new ProductBrand(brandData);
      return await brand.save();
    //Lỗi này sẽ xuất hiện trên terminal (hoặc log server) khi không được xử lý trong controller.
  } catch (error) {
    throw new Error("Lỗi khi tạo thương hiệu sản phẩm: " + error.message);
  }
};

// Lấy tất cả thương hiệu sản phẩm
exports.getAllProductBrands = async (filters = {}) => {
  try {
    return await ProductBrand.find(filters);
  } catch (error) {
    throw new Error("Lỗi khi lấy danh sách thương hiệu sản phẩm: " + error.message);
  }
};

// Lấy chi tiết thương hiệu sản phẩm
exports.getProductBrandById = async (id) => {
  try {
    return await ProductBrand.findById(id);
  } catch (error) {
    throw new Error("Lỗi khi lấy chi tiết thương hiệu sản phẩm: " + error.message);
  }
};

// Cập nhật thương hiệu sản phẩm
exports.updateProductBrand = async (id, updateData) => {
  try {
    return await ProductBrand.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
  } catch (error) {
    throw new Error("Lỗi khi cập nhật thương hiệu sản phẩm: " + error.message);
  }
};

// Xóa thương hiệu sản phẩm
exports.deleteProductBrand = async (id) => {
  try {
    return await ProductBrand.findByIdAndDelete(id);
  } catch (error) {
    throw new Error("Lỗi khi xóa thương hiệu sản phẩm: " + error.message);
  }
};