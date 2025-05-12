const Voucher = require('../models/vouchers.model');

// Tạo voucher mới
exports.createVoucherSv = async (voucherData) => {
  try {

    const voucher = new Voucher(voucherData);
    return await voucher.save();
  } catch (error) {
    // Kiểm tra lỗi unique
    if (error.name === "ValidationError") {
      throw new Error(Object.values(error.errors).map(err => err.message).join(", "));
    }
    throw new Error("Lỗi khi tạo voucher: " + error.message);
  }
};

// Lấy tất cả vouchers
exports.getAllVouchersSv = async (filters = {}) => {
  try {
    return await Voucher.find(filters);
  } catch (error) {
    throw new Error("Lỗi khi lấy danh sách vouchers: " + error.message);
  }
};

// Lấy chi tiết voucher
exports.getVoucherByIdSv = async (id) => {
  try {
    return await Voucher.findById(id);
  } catch (error) {
    throw new Error("Lỗi khi lấy chi tiết voucher: " + error.message);
  }
};

// Cập nhật voucher
exports.updateVoucherSv = async (id, updateData) => {
  try {
    return await Voucher.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
  } catch (error) {
    throw new Error("Lỗi khi cập nhật voucher: " + error.message);
  }
};

// Xóa voucher
exports.deleteVoucherSv = async (id) => {
  try {
    return await Voucher.findByIdAndDelete(id);
  } catch (error) {
    throw new Error("Lỗi khi xóa voucher: " + error.message);
  }
};