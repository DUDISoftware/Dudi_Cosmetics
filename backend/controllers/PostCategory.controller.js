const CategoryPostService = require('../services/PostCategory.service');
const toSlug = require('../utils/slug.util'); // Import hàm toSlug

// Tạo loại bài viết mới
exports.createCategoryPost = async (req, res) => {
  try {
    const categoryData = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!categoryData || !categoryData.title) {
      return res.status(400).json({
        status: false,
        message: "Dữ liệu loại bài viết không hợp lệ",
      });
    }

    // Tạo slug từ title
    categoryData.slug = toSlug(categoryData.title);

    // Gọi service để tạo loại bài viết mới
    const newCategory = await CategoryPostService.createCategoryPostSv(categoryData);
    res.status(201).json({
      status: true,
      message: "Tạo loại bài viết thành công",
      data: newCategory,
    });
  } catch (error) {
    console.error("Lỗi tạo loại bài viết:", error.message);
    res.status(400).json({
      status: false,
      message: `Lỗi tạo loại bài viết: ${error.message}`, // Trả về lỗi chi tiết
    });
  }
};

// Cập nhật loại bài viết
exports.updateCategoryPost = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!id || !updateData) {
      return res.status(400).json({
        status: false,
        message: "Dữ liệu cập nhật không hợp lệ",
      });
    }

    // Tạo slug từ title nếu có cập nhật title
    if (updateData.title) {
      updateData.slug = toSlug(updateData.title);
    }

    const updatedCategory = await CategoryPostService.updateCategoryPostSv(id, updateData);
    if (!updatedCategory) {
      return res.status(404).json({
        status: false,
        message: "Không tìm thấy loại bài viết",
      });
    }

    res.status(200).json({
      status: true,
      message: "Cập nhật loại bài viết thành công",
      data: updatedCategory,
    });
  } catch (error) {
    console.error("Lỗi cập nhật loại bài viết:", error.message);
    res.status(400).json({
      status: false,
      message: `Lỗi cập nhật loại bài viết: ${error.message}`, // Trả về lỗi chi tiết
    });
  }
};

// Lấy danh sách loại bài viết
exports.getAllCategoryPost = async (req, res) => {
  try {
    const filters = req.query || {};
    const newCategory = await CategoryPostService.getAllCategoryPostSv(filters);
    res.status(200).json({
      status: true,
      data: newCategory,
    });
  } catch (error) {
    console.error("Lỗi lấy danh sách loại bài viết:", error.message);
    res.status(500).json({
      status: false,
      message: "Lỗi server",
    });
  }
};

// Lấy chi tiết loại bài viết
exports.getCategoryPostSById = async (req, res) => {
  try {
    const categoryId = req.params.id;

    if (!categoryId) {
      return res.status(400).json({
        status: false,
        message: "ID loại bài viết không hợp lệ",
      });
    }

    const category = await CategoryPostService.getCategoryPostSByIdSv(categoryId);
    if (!category) {
      return res.status(404).json({
        status: false,
        message: "Không tìm thấy loại bài viết",
      });
    }

    res.status(200).json({
      status: true,
      data: category,
    });
  } catch (error) {
    console.error("Lỗi lấy chi tiết loại bài viết:", error.message);
    res.status(500).json({
      status: false,
      message: "Lỗi server",
    });
  }
};

// Xóa loại bài viết
exports.deleteCategoryPost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        status: false,
        message: "ID loại bài viết không hợp lệ",
      });
    }

    const deletedBrand = await CategoryPostService.deleteCategoryPostSv(id);
    if (!deletedBrand) {
      return res.status(404).json({
        status: false,
        message: "Không tìm thấy loại bài viết",
      });
    }

    res.status(200).json({
      status: true,
      message: "Xóa loại bài viết thành công",
    });
  } catch (error) {
    console.error("Lỗi xóa loại bài viết:", error.message);
    res.status(500).json({
      status: false,
      message: "Lỗi server",
    });
  }
};