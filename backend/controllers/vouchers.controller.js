const VouchersService = require('../services/vouchers.service');

// Tạo voucher mới
exports.createVoucher = async (req, res) => {
  try {
    const voucherData = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!voucherData || !voucherData.code || !voucherData.quantity) {
      return res.status(400).json({
        status: false,
        message: "Dữ liệu voucher không hợp lệ",
      });
    }

    // Gọi service để tạo voucher mới
    const newVoucher = await VouchersService.createVoucherSv(voucherData);
    res.status(201).json({
      status: true,
      message: "Tạo voucher thành công",
      data: newVoucher,
    });
  } catch (error) {
    console.error("Lỗi tạo voucher:", error.message);
    res.status(400).json({
      status: false,
      message: `Lỗi tạo voucher: ${error.message}`,
    });
  }
};

// Lấy danh sách vouchers
exports.getAllVouchers = async (req, res) => {
  try {
    const filters = req.query || {};
    const vouchers = await VouchersService.getAllVouchersSv(filters);
    res.status(200).json({
      status: true,
      data: vouchers,
    });
  } catch (error) {
    console.error("Lỗi lấy danh sách vouchers:", error.message);
    res.status(500).json({
      status: false,
      message: "Lỗi server",
    });
  }
};

// Lấy chi tiết voucher
exports.getVoucherById = async (req, res) => {
  try {
    const voucherId = req.params.id;

    if (!voucherId) {
      return res.status(400).json({
        status: false,
        message: "ID voucher không hợp lệ",
      });
    }

    const voucher = await VouchersService.getVoucherByIdSv(voucherId);
    if (!voucher) {
      return res.status(404).json({
        status: false,
        message: "Không tìm thấy voucher",
      });
    }

    res.status(200).json({
      status: true,
      data: voucher,
    });
  } catch (error) {
    console.error("Lỗi lấy chi tiết voucher:", error.message);
    res.status(500).json({
      status: false,
      message: "Lỗi server",
    });
  }
};

// Cập nhật voucher
exports.updateVoucher = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!id || !updateData) {
      return res.status(400).json({
        status: false,
        message: "Dữ liệu cập nhật không hợp lệ",
      });
    }

    const updatedVoucher = await VouchersService.updateVoucherSv(id, updateData);
    if (!updatedVoucher) {
      return res.status(404).json({
        status: false,
        message: "Không tìm thấy voucher",
      });
    }

    res.status(200).json({
      status: true,
      message: "Cập nhật voucher thành công",
      data: updatedVoucher,
    });
  } catch (error) {
    console.error("Lỗi cập nhật voucher:", error.message);
    res.status(500).json({
      status: false,
      message: "Lỗi server",
    });
  }
};

// Xóa voucher
exports.deleteVoucher = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        status: false,
        message: "ID voucher không hợp lệ",
      });
    }

    const deletedVoucher = await VouchersService.deleteVoucherSv(id);
    if (!deletedVoucher) {
      return res.status(404).json({
        status: false,
        message: "Không tìm thấy voucher",
      });
    }

    res.status(200).json({
      status: true,
      message: "Xóa voucher thành công",
    });
  } catch (error) {
    console.error("Lỗi xóa voucher:", error.message);
    res.status(500).json({
      status: false,
      message: "Lỗi server",
    });
  }
};