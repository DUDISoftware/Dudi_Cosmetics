const Banner = require('../models/banners.model');
const cloudinary = require('../config/cloudinary.config');
const { updateImageOnCloudinary } = require('../utils/cloudinary.util');


// Tạo banner mới
exports.createBannerSv = async (bannerData, file) => {
  try {
    if (!file || !file.path) {
      throw new Error("File không hợp lệ");
    }

    // Tải ảnh lên Cloudinary
    const uploadResult = await cloudinary.uploader.upload(file.path, {
      folder: 'banners', // Thư mục lưu trữ trên Cloudinary
    });

    // Lưu URL ảnh từ Cloudinary vào bannerData
    bannerData.image = uploadResult.secure_url;

    // Tạo banner mới trong MongoDB
    const banner = new Banner(bannerData);
    return await banner.save();
  } catch (error) {
    if (error.name === "ValidationError") {
      // Trả về thông báo lỗi cụ thể từ MongoDB
      const errorMessage = Object.values(error.errors).map(err => err.message).join(", ");
      throw new Error(errorMessage);
    }
    throw new Error("Lỗi khi tạo banner: " + error.message);
  }
};

// Lấy tất cả banners
exports.getAllBannersSv = async (filters = {}) => {
  try {
    return await Banner.find(filters);
  } catch (error) {
    throw new Error("Lỗi khi lấy danh sách banners: " + error.message);
  }
};

// Lấy chi tiết banner
exports.getBannerByIdSv = async (id) => {
  try {
    return await Banner.findById(id);
  } catch (error) {
    throw new Error("Lỗi khi lấy chi tiết banner: " + error.message);
  }
};

// Cập nhật banner
exports.updateBannerSv = async (id, updateData, file) => {
  try {
    const banner = await Banner.findById(id);
    if (!banner) {
      throw new Error("Không tìm thấy banner");
    }

    // Nếu có file mới, xử lý cập nhật ảnh
    if (file && file.path) {
      const uploadResult = await updateImageOnCloudinary(
        banner.image, // Public ID của ảnh cũ
        file.path,    // Đường dẫn file mới
        'banners'     // Thư mục trên Cloudinary
      );
      updateData.image = uploadResult.secure_url; // Cập nhật URL ảnh mới
    }

    return await Banner.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
  } catch (error) {
    throw new Error("Lỗi khi cập nhật banner: " + error.message);
  }
};

// Xóa banner
exports.deleteBannerSv = async (id) => {
  try {
    return await Banner.findByIdAndDelete(id);
  } catch (error) {
    throw new Error("Lỗi khi xóa banner: " + error.message);
  }
};