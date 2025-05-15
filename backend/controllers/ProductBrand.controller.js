const productBrandService = require('../services/ProductBrand.service');

// Tạo thương hiệu sản phẩm mới
exports.createProductBrand = async (req, res) => {
  try {
    const brandData = req.body;
    const file = req.file;

    if (!brandData || !brandData.Brand_name || !file) {
      return res.status(400).json({
        status: false,
        message: "Dữ liệu thương hiệu không hợp lệ hoặc thiếu file ảnh",
      });
    }

    const newBrand = await productBrandService.createProductBrandSv(brandData, file);
    res.status(201).json({
      status: true,
      message: "Tạo thương hiệu sản phẩm thành công",
      data: newBrand,
    });
  } catch (error) {
    console.error("Lỗi tạo thương hiệu sản phẩm:", error.message);
    res.status(400).json({
      status: false,
      message: `Lỗi tạo thương hiệu sản phẩm: ${error.message}`,
    });
  }
};

// Cập nhật thương hiệu sản phẩm
exports.updateProductBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const file = req.file;

    if (!id || !updateData) {
      return res.status(400).json({
        status: false,
        message: "Dữ liệu cập nhật không hợp lệ",
      });
    }

    const updatedBrand = await productBrandService.updateProductBrandSv(id, updateData, file);
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
      message: `Lỗi cập nhật thương hiệu sản phẩm: ${error.message}`,
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

    const deletedBrand = await productBrandService.deleteProductBrandSv(id);
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
      message: `Lỗi xóa thương hiệu sản phẩm: ${error.message}`,
    });
  }
};

// Lấy danh sách thương hiệu sản phẩm
exports.getAllProductBrands = async (req, res) => {
  try {
    const filters = req.query || {};
    const brands = await productBrandService.getAllProductBrandSv(filters);
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

    const brand = await productBrandService.getProductBrandByIdSv(brandId);
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

