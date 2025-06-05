const ProductBrand = require('../models/ProductBrand.model');
const cloudinary = require('../config/cloudinary.config');
const { updateImageOnCloudinary } = require('../utils/cloudinary.util');
const toSlug = require('../utils/slug.util');

// Tạo thương hiệu sản phẩm mới
exports.createProductBrandSv = async (brandData, file) => {
  try {
    if (!file || !file.path) {
      throw new Error("File không hợp lệ");
    }

    const uploadResult = await cloudinary.uploader.upload(file.path, {
      folder: 'productbrands',
    });

    brandData.image_url = uploadResult.secure_url;
    brandData.slug = toSlug(brandData.Brand_name);

    const brand = new ProductBrand(brandData);
    return await brand.save();
  } catch (error) {
    if (error.name === "ValidationError") {
      const errorMessage = Object.values(error.errors).map(err => err.message).join(", ");
      throw new Error(errorMessage);
    }
    throw new Error("Lỗi khi tạo thương hiệu sản phẩm: " + error.message);
  }
};

// Cập nhật thương hiệu sản phẩm
exports.updateProductBrandSv = async (id, updateData, file) => {
  try {
    const brand = await ProductBrand.findById(id);
    if (!brand) {
      throw new Error("Không tìm thấy thương hiệu sản phẩm");
    }

    if (updateData.Brand_name) {
      updateData.slug = toSlug(updateData.Brand_name);
    }

    if (file && file.path) {
      const oldPublicId = brand.image_url.replace(/^.*\/upload\/(?:v\d+\/)?/, '').replace(/\.[^/.]+$/, '');
      const uploadResult = await updateImageOnCloudinary(
        oldPublicId,
        file.path,
        'productbrands'
      );
      updateData.image_url = uploadResult.secure_url;
    }

    return await ProductBrand.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
  } catch (error) {
    throw new Error("Lỗi khi cập nhật thương hiệu sản phẩm: " + error.message);
  }
};

// Xóa thương hiệu sản phẩm
exports.deleteProductBrandSv = async (id) => {
  try {
    const brand = await ProductBrand.findById(id);
    if (!brand) {
      throw new Error("Không tìm thấy thương hiệu sản phẩm");
    }

    const oldPublicId = brand.image_url.replace(/^.*\/upload\/(?:v\d+\/)?/, '').replace(/\.[^/.]+$/, '');
    await cloudinary.uploader.destroy(oldPublicId, { invalidate: true });

    return await ProductBrand.findByIdAndDelete(id);
  } catch (error) {
    throw new Error("Lỗi khi xóa thương hiệu sản phẩm: " + error.message);
  }
};

// Lấy tất cả thương hiệu sản phẩm
exports.getAllProductBrandSv = async (filters = {}) => {
  try {
    return await ProductBrand.find(filters);
  } catch (error) {
    throw new Error("Lỗi khi lấy danh sách thương hiệu sản phẩm: " + error.message);
  }
};

// Lấy chi tiết thương hiệu sản phẩm
exports.getProductBrandByIdSv = async (id) => {
  try {
    return await ProductBrand.findById(id);
  } catch (error) {
    throw new Error("Lỗi khi lấy chi tiết thương hiệu sản phẩm: " + error.message);
  }
};

