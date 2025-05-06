const productService = require('../services/Product.service');

// Lấy danh sách sản phẩm
exports.getProducts = async (req, res) => {
  try {
    const filters = req.query || {};
    const products = await productService.getAllProducts(filters);
    res.status(200).json({
      status: true,
      data: products,
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
    const productId = req.params.id;
    if (!productId) {
      return res.status(400).json({
        status: false,
        message: "ID sản phẩm không hợp lệ",
      });
    }

    const product = await productService.getProductById(productId);
    if (!product) {
      return res.status(404).json({
        status: false,
        message: "Không tìm thấy sản phẩm",
      });
    }

    res.status(200).json({
      status: true,
      data: product,
    });
  } catch (error) {
    console.error("Lỗi lấy chi tiết sản phẩm:", error.message);
    res.status(500).json({
      status: false,
      message: "Lỗi server",
    });
  }
};

// Tạo sản phẩm mới
exports.createProduct = async (req, res) => {
  try {
    const productData = req.body;
    if (!productData || !productData.name || !productData.category_id || !productData.brand_id) {
      return res.status(400).json({
        status: false,
        message: "Dữ liệu sản phẩm không hợp lệ",
      });
    }

    const newProduct = await productService.createProduct(productData);
    res.status(201).json({
      status: true,
      message: "Tạo sản phẩm thành công",
      data: newProduct,
    });
  } catch (error) {
    console.error("Lỗi tạo sản phẩm:", error.message);
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

    const updatedProduct = await productService.updateProduct(id, updateData);
    if (!updatedProduct) {
      return res.status(404).json({
        status: false,
        message: "Không tìm thấy sản phẩm",
      });
    }

    res.status(200).json({
      status: true,
      message: "Cập nhật sản phẩm thành công",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Lỗi cập nhật sản phẩm:", error.message);
    res.status(500).json({
      status: false,
      message: "Lỗi server",
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
        message: "ID sản phẩm không hợp lệ",
      });
    }

    const deletedProduct = await productService.deleteProduct(id);
    if (!deletedProduct) {
      return res.status(404).json({
        status: false,
        message: "Không tìm thấy sản phẩm",
      });
    }

    res.status(200).json({
      status: true,
      message: "Xóa sản phẩm thành công",
    });
  } catch (error) {
    console.error("Lỗi xóa sản phẩm:", error.message);
    res.status(500).json({
      status: false,
      message: "Lỗi server",
    });
  }
};

// Lấy sản phẩm hot
exports.getHotProducts = async (req, res) => {
  try {
    const hotProducts = await productService.getHotProducts();
    res.status(200).json({
      status: true,
      data: hotProducts,
    });
  } catch (error) {
    console.error("Lỗi lấy sản phẩm hot:", error.message);
    res.status(500).json({
      status: false,
      message: "Lỗi server",
    });
  }
};

// Tìm kiếm sản phẩm
exports.searchProducts = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({
        status: false,
        message: "Từ khóa tìm kiếm không hợp lệ",
      });
    }

    const products = await productService.searchProducts(query);
    res.status(200).json({
      status: true,
      data: products,
    });
  } catch (error) {
    console.error("Lỗi tìm kiếm sản phẩm:", error.message);
    res.status(500).json({
      status: false,
      message: "Lỗi server",
    });
  }
};