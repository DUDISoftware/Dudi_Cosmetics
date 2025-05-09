const Banner = require('../models/banners.model');

// Tạo banner mới
exports.createBannerSv = async (bannerData) => {
  try {
    const banner = new Banner(bannerData);
    return await banner.save();
  } catch (error) {
    // Kiểm tra lỗi unique
    if (error.name === "ValidationError") {
      throw new Error(Object.values(error.errors).map(err => err.message).join(", "));
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
exports.updateBannerSv = async (id, updateData) => {
  try {
    return await Banner.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
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