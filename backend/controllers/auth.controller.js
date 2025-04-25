const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.register = async (req, res) => {
  try {
    const { email, password, fullname, dateOfBirth, phone, gender } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email đã tồn tại" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hashedPassword,
      fullname,
      dateOfBirth,
      phone,
      gender,
    });

    await user.save();
    res.status(201).json({ message: "Đăng ký thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};

exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: "Email không đúng" });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Mật khẩu không đúng" });
  
    
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
      res.status(500).json({ message: "Lỗi server", error });
    }
  };

// Danh sách user
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json({ 
      status: true, 
      data: users 
    });
  } catch (error) {
    console.error("Lỗi lấy danh sách người dùng:", error.message);
    res.status(500).json({ 
      status: false, 
      message: "Lỗi server" 
    });
  }
};

// Chi tiết user
exports.getUserById = async (req, res) => {
  try {
    const userId = req.query.id;
    
    if (!userId) {
      return res.status(400).json({ 
        status: false, 
        message: "Thiếu ID người dùng" 
      });
    }

    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ 
        status: false, 
        message: "Không tìm thấy người dùng" 
      });
    }
    
    res.status(200).json({ 
      status: true, 
      data: user 
    });
  } catch (error) {
    console.error("Lỗi lấy chi tiết người dùng:", error.message);
    res.status(500).json({ 
      status: false, 
      message: "Lỗi server" 
    });
  }
};

// Sửa user
exports.updateUser = async (req, res) => {
  try {
    console.log("Request body:", req.body); // Add this for debugging
    const { id, email, username, dateOfBirth, phone, gender, role } = req.body;
    
    if (!id) {
      return res.status(400).json({
        status: false,
        message: "Thiếu ID người dùng"
      });
    }

    // Kiểm tra email đã tồn tại chưa (nếu email được cập nhật)
    if (email) {
      const existingUser = await User.findOne({ email, _id: { $ne: id } });
      if (existingUser) {
        return res.status(400).json({
          status: false,
          message: "Email đã được sử dụng"
        });
      }
    }

    // Tạo đối tượng chứa thông tin cần cập nhật
    const updateData = {};
    if (username) updateData.fullname = username;
    if (email) updateData.email = email;
    if (dateOfBirth) updateData.dateOfBirth = dateOfBirth;
    if (gender !== undefined) updateData.gender = gender;
    if (role) updateData.role = role;
    if (phone) updateData.phone = phone;
    
    // Cập nhật thông tin người dùng
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({
        status: false,
        message: "Không tìm thấy người dùng"
      });
    }

    res.status(200).json({
      status: true,
      message: "Cập nhật thành công",
      data: updatedUser
    });
  } catch (error) {
    console.error("Lỗi cập nhật thông tin người dùng:", error.message);
    res.status(500).json({
      status: false,
      message: "Lỗi server"
    });
  }
};

// Xóa user
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.query.id;
    
    if (!userId) {
      return res.status(400).json({ 
        status: false, 
        message: "Thiếu ID người dùng" 
      });
    }

    const deletedUser = await User.findByIdAndDelete(userId);
    
    if (!deletedUser) {
      return res.status(404).json({ 
        status: false, 
        message: "Không tìm thấy người dùng" 
      });
    }
    
    res.status(200).json({ 
      status: true, 
      message: "Xóa người dùng thành công"
    });
  } catch (error) {
    console.error("Lỗi xóa người dùng:", error.message);
    res.status(500).json({ 
      status: false, 
      message: "Lỗi server" 
    });
  }
};