const PCChildService = require('../services/ProductCategoryChild.service');

// Tạo danh mục con mới
exports.createPCChild = async (req, res) => {
  try {
    const childData = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!childData || !childData.category_name || !childData.slug) {
      return res.status(400).json({
        status: false,
        message: "Dữ liệu danh mục con không hợp lệ",
      });
    }

    // Gọi service để tạo danh mục con
    const newChild = await PCChildService.createPCChildSv(childData);
    res.status(201).json({
      status: true,
      message: "Tạo danh mục con thành công",
      data: newChild,
    });
  } catch (error) {
    console.error("Lỗi tạo danh mục con:", error.message);
    res.status(400).json({
      status: false,
      message: error.message, // Trả về lỗi chi tiết
    });
  }
};

// Lấy danh sách danh mục con
exports.getAllPCChild = async (req, res) => {
  try {
    const filters = req.query || {};
    const children = await PCChildService.getAllPCChildSv(filters);
    res.status(200).json({
      status: true,
      data: children,
    });
  } catch (error) {
    console.error("Lỗi lấy danh sách danh mục con:", error.message);
    res.status(500).json({
      status: false,
      message: "Lỗi server",
    });
  }
};

// Lấy chi tiết danh mục con
exports.getPCChildById = async (req, res) => {
  try {
    const childId = req.params.id;

    if (!childId) {
      return res.status(400).json({
        status: false,
        message: "ID danh mục con không hợp lệ",
      });
    }

    const child = await PCChildService.getPCChildByIdSv(childId);
    if (!child) {
      return res.status(404).json({
        status: false,
        message: "Không tìm thấy danh mục con",
      });
    }

    res.status(200).json({
      status: true,
      data: child,
    });
  } catch (error) {
    console.error("Lỗi lấy chi tiết danh mục con:", error.message);
    res.status(500).json({
      status: false,
      message: "Lỗi server",
    });
  }
};

// Cập nhật danh mục con
exports.updatePCChild = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!id || !updateData) {
      return res.status(400).json({
        status: false,
        message: "Dữ liệu cập nhật không hợp lệ",
      });
    }

    const updatedChild = await PCChildService.updatePCChildSv(id, updateData);
    if (!updatedChild) {
      return res.status(404).json({
        status: false,
        message: "Không tìm thấy danh mục con",
      });
    }

    res.status(200).json({
      status: true,
      message: "Cập nhật danh mục con thành công",
      data: updatedChild,
    });
  } catch (error) {
    console.error("Lỗi cập nhật danh mục con:", error.message);
    res.status(400).json({
      status: false,
      message: error.message, // Trả về lỗi chi tiết
    });
  }
};

// Xóa danh mục con
exports.deletePCChild = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        status: false,
        message: "ID danh mục con không hợp lệ",
      });
    }

    const deletedChild = await PCChildService.deletePCChildSv(id);
    if (!deletedChild) {
      return res.status(404).json({
        status: false,
        message: "Không tìm thấy danh mục con",
      });
    }

    res.status(200).json({
      status: true,
      message: "Xóa danh mục con thành công",
    });
  } catch (error) {
    console.error("Lỗi xóa danh mục con:", error.message);
    res.status(500).json({
      status: false,
      message: "Lỗi server",
    });
  }
};