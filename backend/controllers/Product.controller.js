const productService = require('../services/Product.service');

// Tạo sản phẩm mới
exports.createProduct = async (req, res) => {
  try {
    const productData = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!productData || !productData.product_name || !productData.slug) {
      return res.status(400).json({
        status: false,
        message: "Dữ liệu không hợp lệ",
      });
    }

    // Gọi service để tạo sản phẩm
    const newProduct = await productService.createProduct(productData);
    res.status(201).json({
      status: true,
      message: "Tạo sản phẩm thành công",
      data: newProduct,
    });
  } catch (error) {
    console.error("Lỗi tạo sản phẩm:", error.message);
    res.status(400).json({
      status: false,
      message: `Lỗi tạo sản phẩm: ${error.message}`,  // Trả về lỗi chi tiết
    });
  }
};

// Lấy danh sách sản phẩm
exports.getAllProducts = async (req, res) => {
  try {
    const filters = req.query || {};
    const brands = await productService.getAllProductsSv(filters);
    res.status(200).json({
      status: true,
      data: brands,
    });
  } catch (error) {
    console.error("Lỗi lấy danh sách sản phẩm:", error.message);
    res.status(500).json({
      status: false,
      message: "Lỗi server",
    });
  }
};

// Lấy chi tiết sản phẩm
exports.getProductById = async (req, res) => {
  try {
    const brandId = req.params.id;

    if (!brandId) {
      return res.status(400).json({
        status: false,
        message: "ID Sản Phẩm không hợp lệ",
      });
    }

    const brand = await productService.getProductByIdSv(brandId);
    if (!brand) {
      return res.status(404).json({
        status: false,
        message: "Không tìm thấy sản phẩm",
      });
    }

    res.status(200).json({
      status: true,
      data: brand,
    });
  } catch (error) {
    console.error("Lỗi lấy chi tiết sản phẩm:", error.message);
    res.status(500).json({
      status: false,
      message: "Lỗi server",
    });
  }
};


// Cập nhật sản phẩm
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!id || !updateData) {
      return res.status(400).json({
        status: false,
        message: "Dữ liệu cập nhật không hợp lệ",
      });
    }

    const updatedBrand = await productService.updateProductSv(id, updateData);
    if (!updatedBrand) {
      return res.status(404).json({
        status: false,
        message: "Không tìm thấy sản phẩm",
      });
    }

    res.status(200).json({
      status: true,
      message: "Cập nhật sản phẩm thành công",
      data: updatedBrand,
    });
  } catch (error) {
    console.error("Lỗi cập nhật sản phẩm:", error.message);
    res.status(400).json({
      status: false,
      message: error.message, // Trả về lỗi chi tiết
    });
  }
};

// Xóa sản phẩm
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        status: false,
        message: "ID Sản phẩm không hợp lệ",
      });
    }

    const deletedBrand = await productService.deleteProductSv(id);
    if (!deletedBrand) {
      return res.status(404).json({
        status: false,
        message: "Không tìm thấy sản phẩm",
      });
    }

    res.status(200).json({
      status: true,
      message: "Xóa thương hiệu sản phẩm thành công",
    });
  } catch (error) {
    console.error("Lỗi xóa sản phẩm:", error.message);
    res.status(500).json({
      status: false,
      message: "Lỗi server",
    });
  }
};
