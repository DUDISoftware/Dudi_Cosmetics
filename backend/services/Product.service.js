const Product = require('../models/Product.model');
const ProductCategoryChild = require('../models/ProductCategoryChild.model');
const ProductBrand = require('../models/ProductBrand.model');
const User = require('../models/User.model');
const cloudinary = require('../config/cloudinary.config');
const { updateImageOnCloudinary } = require('../utils/cloudinary.util');

// Tạo sản phẩm mới
exports.createProductSv = async (productData, file) => {
  try {
    if (!file || !file.path) {
      throw new Error("File không hợp lệ");
    }

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

    // Tải ảnh lên Cloudinary
    const uploadResult = await cloudinary.uploader.upload(file.path, {
      folder: 'products', // Thư mục lưu trữ trên Cloudinary
    });

    // Lưu URL ảnh từ Cloudinary vào productData
    productData.image = uploadResult.secure_url;

    // Tạo sản phẩm mới
    const product = new Product(productData);
    return await product.save();
  } catch (error) {
    if (error.name === "ValidationError") {
      const errorMessage = Object.values(error.errors).map(err => err.message).join(", ");
      throw new Error(errorMessage);
    }
    throw new Error("Lỗi khi tạo sản phẩm: " + error.message);
  }
};

// Cập nhật sản phẩm
exports.updateProductSv = async (id, updateData, file) => {
  try {
    const product = await Product.findById(id);
    if (!product) {
      throw new Error("Không tìm thấy sản phẩm");
    }

    // Nếu có file mới, xử lý cập nhật ảnh
    if (file && file.path) {
      const oldPublicId = product.image.replace(/^.*\/upload\/(?:v\d+\/)?/, '').replace(/\.[^/.]+$/, '');
      const uploadResult = await updateImageOnCloudinary(
        oldPublicId,  // Public ID của ảnh cũ
        file.path,    // Đường dẫn file mới
        'products'    // Thư mục trên Cloudinary
      );
      updateData.image = uploadResult.secure_url; // Cập nhật URL ảnh mới
    }

    return await Product.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
  } catch (error) {
    throw new Error("Lỗi khi cập nhật sản phẩm: " + error.message);
  }
};

// Xóa sản phẩm
exports.deleteProductSv = async (id) => {
  try {
    const product = await Product.findById(id);
    if (!product) {
      throw new Error("Không tìm thấy sản phẩm");
    }

    // Lấy Public ID từ URL ảnh
    const oldPublicId = product.image.replace(/^.*\/upload\/(?:v\d+\/)?/, '').replace(/\.[^/.]+$/, '');

    // Xóa ảnh trên Cloudinary
    await cloudinary.uploader.destroy(oldPublicId, { invalidate: true });

    // Xóa sản phẩm trong cơ sở dữ liệu
    return await Product.findByIdAndDelete(id);
  } catch (error) {
    throw new Error("Lỗi khi xóa sản phẩm: " + error.message);
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





