const PCParentService = require('../services/ProductCategoryParent.service');
const toSlug = require('../utils/slug.util'); // Import hàm toSlug

// Tạo danh mục sản phẩm cha mới
exports.createPCParent = async (req, res) => {
  try {
    const categoryData = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!categoryData || !categoryData.category_name) {
      return res.status(400).json({
        status: false,
        message: "Dữ liệu danh mục không hợp lệ",
      });
    }

    // Tạo slug từ category_name
    categoryData.slug = toSlug(categoryData.category_name);

    // Gọi service để tạo danh mục sản phẩm cha
    const newCategory = await PCParentService.createPCParentSv(categoryData);
    res.status(201).json({
      status: true,
      message: "Tạo danh mục sản phẩm cha thành công",
      data: newCategory,
    });
  } catch (error) {
    console.error("Lỗi tạo danh mục sản phẩm cha:", error.message);
    res.status(400).json({
      status: false,
      message: `Lỗi tạo danh mục sản phẩm cha: ${error.message}`, // Trả về lỗi chi tiết
    });
  }
};

// Cập nhật danh mục sản phẩm cha
exports.updatePCParent = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!id || !updateData) {
      return res.status(400).json({
        status: false,
        message: "Dữ liệu cập nhật không hợp lệ",
      });
    }

    // Tạo slug từ category_name nếu có cập nhật category_name
    if (updateData.category_name) {
      updateData.slug = toSlug(updateData.category_name);
    }

    const updatedCategory = await PCParentService.updatePCParentSv(id, updateData);
    if (!updatedCategory) {
      return res.status(404).json({
        status: false,
        message: "Không tìm thấy danh mục sản phẩm cha",
      });
    }

    res.status(200).json({
      status: true,
      message: "Cập nhật danh mục sản phẩm cha thành công",
      data: updatedCategory,
    });
  } catch (error) {
    console.error("Lỗi cập nhật danh mục sản phẩm cha:", error.message);
    res.status(400).json({
      status: false,
      message: error.message, // Trả về lỗi chi tiết
    });
  }
};

// Lấy danh sách danh mục sản phẩm cha
exports.getAllPCParent = async (req, res) => {
  try {
    const filters = req.query || {};
    const categories = await PCParentService.getAllPCParentSv(filters);
    res.status(200).json({
      status: true,
      data: categories,
    });
  } catch (error) {
    console.error("Lỗi lấy danh sách danh mục sản phẩm cha:", error.message);
    res.status(500).json({
      status: false,
      message: "Lỗi server",
    });
  }
};

// Lấy chi tiết danh mục sản phẩm cha
exports.getPCParentId = async (req, res) => {
  try {
    const categoryId = req.params.id;

    if (!categoryId) {
      return res.status(400).json({
        status: false,
        message: "ID danh mục không hợp lệ",
      });
    }

    const category = await PCParentService.getPCParentsvByIdSv(categoryId);
    if (!category) {
      return res.status(404).json({
        status: false,
        message: "Không tìm thấy danh mục sản phẩm cha",
      });
    }

    res.status(200).json({
      status: true,
      data: category,
    });
  } catch (error) {
    console.error("Lỗi lấy chi tiết danh mục sản phẩm cha:", error.message);
    res.status(500).json({
      status: false,
      message: "Lỗi server",
    });
  }
};

// Xóa danh mục sản phẩm cha
exports.deletePCParent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        status: false,
        message: "ID danh mục không hợp lệ",
      });
    }

    const deletedCategory = await PCParentService.deletePCParentSv(id);
    if (!deletedCategory) {
      return res.status(404).json({
        status: false,
        message: "Không tìm thấy danh mục sản phẩm cha",
      });
    }

    res.status(200).json({
      status: true,
      message: "Xóa danh mục sản phẩm cha thành công",
    });
  } catch (error) {
    console.error("Lỗi xóa danh mục sản phẩm cha:", error.message);
    res.status(500).json({
      status: false,
      message: "Lỗi server",
    });
  }
};