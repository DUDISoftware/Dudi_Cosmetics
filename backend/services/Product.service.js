const Product = require('../models/Product.model');
const ProductCategoryChild = require('../models/ProductCategoryChild.model');
const ProductBrand = require('../models/ProductBrand.model');
const User = require('../models/User.model');

// Tạo sản phẩm mới
exports.createProduct = async (productData) => {
  try {
    // Kiểm tra category_id
    const categoryExists = await ProductCategoryChild.findById(productData.category_id);
    if (!categoryExists) {
      throw new Error("category_id không tồn tại");
    }

    // Kiểm tra brand_id
    const brandExists = await ProductBrand.findById(productData.brand_id);
    if (!brandExists) {
      throw new Error("brand_id không tồn tại");
    }

    // Kiểm tra user_id
    const userExists = await User.findById(productData.user_id);
    if (!userExists) {
      throw new Error("user_id không tồn tại");
    }

    // Tạo sản phẩm
    const product = new Product(productData);
    return await product.save();
  } catch (error) {
    // Kiểm tra lỗi unique
    if (error.name === "ValidationError") {
      throw new Error(Object.values(error.errors).map(err => err.message).join(", "));
    }
    throw new Error("Lỗi khi tạo sản phẩm: " + error.message);
  }
};

// Lấy tất cả sản phẩm
exports.getAllProductsSv = async (filters = {}) => {
  try {
    return await Product.find(filters);
  } catch (error) {
    throw new Error("Lỗi khi lấy danh sách sản phẩm: " + error.message);
  }
};

// Lấy chi tiết sản phẩm
exports.getProductByIdSv = async (id) => {
  try {
    return await Product.findById(id);
  } catch (error) {
    throw new Error("Lỗi khi lấy chi tiết sản phẩm: " + error.message);
  }
};



// Cập nhật sản phẩm
exports.updateProductSv = async (id, updateData) => {
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

// Xóa sản phẩm
exports.deleteProductSv = async (id) => {
  try {
    return await Product.findByIdAndDelete(id);
  } catch (error) {
    throw new Error("Lỗi khi xóa sản phẩm: " + error.message);
  }
};


