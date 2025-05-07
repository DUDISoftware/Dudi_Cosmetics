const User = require('../models/User.model');
const bcrypt = require("bcryptjs");

// Tạo người dùng mới
exports.createUser = async (userData) => {
  try {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = new User({
      ...userData,
      password: hashedPassword,
    });
    return await user.save();
  } catch (error) {
    throw new Error("Lỗi khi tạo người dùng: " + error.message);
  }
};

// Lấy người dùng theo email
exports.getUserByEmail = async (email) => {
  try {
    return await User.findOne({ email });
  } catch (error) {
    throw new Error("Lỗi khi tìm người dùng theo email: " + error.message);
  }
};

// Lấy danh sách người dùng
exports.getAllUsers = async (filters = {}) => {
  try {
    return await User.find(filters).select('-password');
  } catch (error) {
    throw new Error("Lỗi khi lấy danh sách người dùng: " + error.message);
  }
};

// Lấy chi tiết người dùng
exports.getUserById = async (id) => {
  try {
    return await User.findById(id).select('-password');
  } catch (error) {
    throw new Error("Lỗi khi lấy chi tiết người dùng: " + error.message);
  }
};

// Cập nhật thông tin người dùng
exports.updateUser = async (id, updateData) => {
  try {
    return await User.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('-password');
  } catch (error) {
    throw new Error("Lỗi khi cập nhật thông tin người dùng: " + error.message);
  }
};

// Xóa người dùng
exports.deleteUser = async (id) => {
  try {
    return await User.findByIdAndDelete(id);
  } catch (error) {
    throw new Error("Lỗi khi xóa người dùng: " + error.message);
  }
};