const BannersService = require('../services/banners.service');

// Tạo banner mới
exports.createBanner = async (req, res) => {
  try {
    const bannerData = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!bannerData || !bannerData.title || !bannerData.image) {
      return res.status(400).json({
        status: false,
        message: "Dữ liệu banner không hợp lệ",
      });
    }

    // Gọi service để tạo banner mới
    const newBanner = await BannersService.createBannerSv(bannerData);
    res.status(201).json({
      status: true,
      message: "Tạo banner thành công",
      data: newBanner,
    });
  } catch (error) {
    console.error("Lỗi tạo banner:", error.message);
    res.status(400).json({
      status: false,
      message: `Lỗi tạo banner: ${error.message}`, 
    });
  }
};

// Lấy danh sách banners
exports.getAllBanners = async (req, res) => {
  try {
    const filters = req.query || {};
    const banners = await BannersService.getAllBannersSv(filters);
    res.status(200).json({
      status: true,
      data: banners,
    });
  } catch (error) {
    console.error("Lỗi lấy danh sách banners:", error.message);
    res.status(500).json({
      status: false,
      message: "Lỗi server",
    });
  }
};

// Lấy chi tiết banner
exports.getBannerById = async (req, res) => {
  try {
    const bannerId = req.params.id;

    if (!bannerId) {
      return res.status(400).json({
        status: false,
        message: "ID banner không hợp lệ",
      });
    }

    const banner = await BannersService.getBannerByIdSv(bannerId);
    if (!banner) {
      return res.status(404).json({
        status: false,
        message: "Không tìm thấy banner",
      });
    }

    res.status(200).json({
      status: true,
      data: banner,
    });
  } catch (error) {
    console.error("Lỗi lấy chi tiết banner:", error.message);
    res.status(500).json({
      status: false,
      message: "Lỗi server",
    });
  }
};

// Cập nhật banner
exports.updateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!id || !updateData) {
      return res.status(400).json({
        status: false,
        message: "Dữ liệu cập nhật không hợp lệ",
      });
    }

    const updatedBanner = await BannersService.updateBannerSv(id, updateData);
    if (!updatedBanner) {
      return res.status(404).json({
        status: false,
        message: "Không tìm thấy banner",
      });
    }

    res.status(200).json({
      status: true,
      message: "Cập nhật banner thành công",
      data: updatedBanner,
    });
  } catch (error) {
    console.error("Lỗi cập nhật banner:", error.message);
    res.status(500).json({
      status: false,
      message: "Lỗi server",
    });
  }
};

// Xóa banner
exports.deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        status: false,
        message: "ID banner không hợp lệ",
      });
    }

    const deletedBanner = await BannersService.deleteBannerSv(id);
    if (!deletedBanner) {
      return res.status(404).json({
        status: false,
        message: "Không tìm thấy banner",
      });
    }

    res.status(200).json({
      status: true,
      message: "Xóa banner thành công",
    });
  } catch (error) {
    console.error("Lỗi xóa banner:", error.message);
    res.status(500).json({
      status: false,
      message: "Lỗi server",
    });
  }
};