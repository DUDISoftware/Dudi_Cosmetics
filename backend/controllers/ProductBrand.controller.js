const productBrandService = require('../services/ProductBrand.service');

// Tạo thương hiệu sản phẩm mới
exports.createProductBrand = async (req, res) => {
  try {
    const brandData = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!brandData || !brandData.Brand_name || !brandData.slug) {
      return res.status(400).json({
        status: false,
        message: "Dữ liệu thương hiệu không hợp lệ",
      });
    }

    // Gọi service để tạo thương hiệu
    const newBrand = await productBrandService.createProductBrand(brandData);
    res.status(201).json({
      status: true,
      message: "Tạo thương hiệu sản phẩm thành công",
      data: newBrand,
    });
  } catch (error) {
    console.error("Lỗi tạo thương hiệu sản phẩm:", error.message);
    res.status(500).json({
      status: false,
      message: "Lỗi server",
    });
  }
};

// Lấy danh sách thương hiệu sản phẩm
exports.getAllProductBrands = async (req, res) => {
  try {
    const filters = req.query || {};
    const brands = await productBrandService.getAllProductBrands(filters);
    res.status(200).json({
      status: true,
      data: brands,
    });
  } catch (error) {
    console.error("Lỗi lấy danh sách thương hiệu sản phẩm:", error.message);
    res.status(500).json({
      status: false,
      message: "Lỗi server",
    });
  }
};

// Lấy chi tiết thương hiệu sản phẩm
exports.getProductBrandById = async (req, res) => {
  try {
    const brandId = req.params.id;

    if (!brandId) {
      return res.status(400).json({
        status: false,
        message: "ID thương hiệu không hợp lệ",
      });
    }

    const brand = await productBrandService.getProductBrandById(brandId);
    if (!brand) {
      return res.status(404).json({
        status: false,
        message: "Không tìm thấy thương hiệu sản phẩm",
      });
    }

    res.status(200).json({
      status: true,
      data: brand,
    });
  } catch (error) {
    console.error("Lỗi lấy chi tiết thương hiệu sản phẩm:", error.message);
    res.status(500).json({
      status: false,
      message: "Lỗi server",
    });
  }
};

// Cập nhật thương hiệu sản phẩm
exports.updateProductBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!id || !updateData) {
      return res.status(400).json({
        status: false,
        message: "Dữ liệu cập nhật không hợp lệ",
      });
    }

    const updatedBrand = await productBrandService.updateProductBrand(id, updateData);
    if (!updatedBrand) {
      return res.status(404).json({
        status: false,
        message: "Không tìm thấy thương hiệu sản phẩm",
      });
    }

    res.status(200).json({
      status: true,
      message: "Cập nhật thương hiệu sản phẩm thành công",
      data: updatedBrand,
    });
  } catch (error) {
    console.error("Lỗi cập nhật thương hiệu sản phẩm:", error.message);
    res.status(500).json({
      status: false,
      message: "Lỗi server",
    });
  }
};

// Xóa thương hiệu sản phẩm
exports.deleteProductBrand = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        status: false,
        message: "ID thương hiệu không hợp lệ",
      });
    }

    const deletedBrand = await productBrandService.deleteProductBrand(id);
    if (!deletedBrand) {
      return res.status(404).json({
        status: false,
        message: "Không tìm thấy thương hiệu sản phẩm",
      });
    }

    res.status(200).json({
      status: true,
      message: "Xóa thương hiệu sản phẩm thành công",
    });
  } catch (error) {
    console.error("Lỗi xóa thương hiệu sản phẩm:", error.message);
    res.status(500).json({
      status: false,
      message: "Lỗi server",
    });
  }
};