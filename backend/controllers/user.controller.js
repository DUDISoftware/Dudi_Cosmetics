const userService = require('../services/user.Service');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Đăng ký người dùng mới
exports.register = async (req, res) => {
  try {
    const userData = req.body;

    // Kiểm tra email đã tồn tại
    const existingUser = await userService.getUserByEmail(userData.email);
    if (existingUser) {
      return res.status(400).json({ message: "Email đã tồn tại" });
    }

    const newUser = await userService.createUser(userData);
    res.status(201).json({ message: "Đăng ký thành công", data: newUser });
  } catch (error) {
    console.error("Lỗi đăng ký người dùng:", error.message);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// Đăng nhập
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kiểm tra email
    const user = await userService.getUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: "Email không đúng" });
    }

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Mật khẩu không đúng" });
    }

    // Tạo token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        fullname: user.fullname,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Lỗi đăng nhập:", error.message);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// Lấy danh sách người dùng
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({ status: true, data: users });
  } catch (error) {
    console.error("Lỗi lấy danh sách người dùng:", error.message);
    res.status(500).json({ status: false, message: "Lỗi server" });
  }
};

// Lấy chi tiết người dùng
exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({ status: false, message: "Thiếu ID người dùng" });
    }

    const user = await userService.getUserById(userId);
    if (!user) {
      return res.status(404).json({ status: false, message: "Không tìm thấy người dùng" });
    }

    res.status(200).json({ status: true, data: user });
  } catch (error) {
    console.error("Lỗi lấy chi tiết người dùng:", error.message);
    res.status(500).json({ status: false, message: "Lỗi server" });
  }
};

// Cập nhật thông tin người dùng
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!id) {
      return res.status(400).json({ status: false, message: "Thiếu ID người dùng" });
    }

    const updatedUser = await userService.updateUser(id, updateData);
    if (!updatedUser) {
      return res.status(404).json({ status: false, message: "Không tìm thấy người dùng" });
    }

    res.status(200).json({ status: true, message: "Cập nhật thành công", data: updatedUser });
  } catch (error) {
    console.error("Lỗi cập nhật thông tin người dùng:", error.message);
    res.status(500).json({ status: false, message: "Lỗi server" });
  }
};

// Xóa người dùng
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ status: false, message: "Thiếu ID người dùng" });
    }

    const deletedUser = await userService.deleteUser(id);
    if (!deletedUser) {
      return res.status(404).json({ status: false, message: "Không tìm thấy người dùng" });
    }

    res.status(200).json({ status: true, message: "Xóa người dùng thành công" });
  } catch (error) {
    console.error("Lỗi xóa người dùng:", error.message);
    res.status(500).json({ status: false, message: "Lỗi server" });
  }
};