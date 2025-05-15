const Product = require('../models/Product.model');
const ProductCategoryChild = require('../models/ProductCategoryChild.model');
const ProductBrand = require('../models/ProductBrand.model');
const User = require('../models/User.model');
const cloudinary = require('../config/cloudinary.config');
const { updateImageOnCloudinary } = require('../utils/cloudinary.util');

// Tạo sản phẩm mới
exports.createProductSv = async (productData, files) => {
  try {
    const imageMain = files?.image_url?.[0];
    const imageSubs = files?.sub_images_urls || [];

    if (!imageMain || !imageMain.path) {
      throw new Error("Ảnh chính không hợp lệ");
    }

    const categoryExists = await ProductCategoryChild.findById(productData.category_id);
    if (!categoryExists) throw new Error("category_id không tồn tại");

    const brandExists = await ProductBrand.findById(productData.brand_id);
    if (!brandExists) throw new Error("brand_id không tồn tại");

    const userExists = await User.findById(productData.user_id);
    if (!userExists) throw new Error("user_id không tồn tại");

    const uploadMain = await cloudinary.uploader.upload(imageMain.path, {
      folder: 'products/main',
    });
    productData.image_url = uploadMain.secure_url;

    const subImages = [];
    for (const img of imageSubs) {
      const uploaded = await cloudinary.uploader.upload(img.path, {
        folder: 'products/subs',
      });
      subImages.push(uploaded.secure_url);
    }
    productData.sub_images_urls = subImages;

    const product = new Product(productData);
    return await product.save();
  } catch (error) {
    if (error.name === "ValidationError") {
      const msg = Object.values(error.errors).map(e => e.message).join(', ');
      throw new Error(msg);
    }
    throw new Error("Lỗi khi tạo sản phẩm: " + error.message);
  }
};

// Cập nhật sản phẩm
exports.updateProductSv = async (id, updateData, files) => {
  try {
    const product = await Product.findById(id);
    if (!product) {
      throw new Error("Không tìm thấy sản phẩm");
    }

    const imageMain = files?.image_url?.[0];
    const imageSubs = files?.sub_images_urls || [];

    if (imageMain && imageMain.path) {
      const oldPublicId = product.image_url?.replace(/^.*\/upload\/(?:v\d+\/)?/, '').replace(/\.[^/.]+$/, '');
      const uploadResult = await updateImageOnCloudinary(oldPublicId, imageMain.path, 'products/main');
      updateData.image_url = uploadResult.secure_url;
    }

    if (imageSubs.length > 0) {
      const subImages = [];
      for (const img of imageSubs) {
        const uploaded = await cloudinary.uploader.upload(img.path, {
          folder: 'products/subs',
        });
        subImages.push(uploaded.secure_url);
      }
      updateData.sub_images_urls = subImages;
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

    const oldPublicId = product.image_url?.replace(/^.*\/upload\/(?:v\d+\/)?/, '').replace(/\.[^/.]+$/, '');
    if (oldPublicId) {
      await cloudinary.uploader.destroy(oldPublicId, { invalidate: true });
    }

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





