const productService = require('../services/Product.service');
const toSlug = require('../utils/slug.util');

// Tạo sản phẩm mới
exports.createProduct = async (req, res) => {
  try {
    const productData = req.body;
    const files = req.files;

    if (!productData || !productData.product_name || !files?.image_url?.[0]) {
      return res.status(400).json({
        status: false,
        message: "Thiếu dữ liệu sản phẩm hoặc ảnh chính",
      });
    }

    productData.slug = toSlug(productData.product_name);

    const newProduct = await productService.createProductSv(productData, files);
    res.status(201).json({
      status: true,
      message: "Tạo sản phẩm thành công",
      data: newProduct,
    });
  } catch (error) {
    console.error("Lỗi tạo sản phẩm:", error.message);
    res.status(400).json({
      status: false,
      message: `Lỗi tạo sản phẩm: ${error.message}`,
    });
  }
};

// Cập nhật sản phẩm
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const files = req.files;

    if (!id || !updateData) {
      return res.status(400).json({
        status: false,
        message: "Dữ liệu cập nhật không hợp lệ",
      });
    }

    if (updateData.product_name) {
      updateData.slug = toSlug(updateData.product_name);
    }

    const updatedProduct = await productService.updateProductSv(id, updateData, files);
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
      message: `Lỗi cập nhật sản phẩm: ${error.message}`,
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

    const deletedProduct = await productService.deleteProductSv(id);
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
      message: `Lỗi xóa sản phẩm: ${error.message}`,
    });
  }
};
// Lấy danh sách sản phẩm (có lọc theo category_id - danh mục con)
exports.getAllProducts = async (req, res) => {
  try {
    const { category_id, brand_id, ...filters } = req.query;

    const query = { ...filters };
    if (category_id) {
      query.category_id = category_id;
    }
  if (brand_id) {
      query.brand_id = brand_id;
    }
     const products = await productService.getAllProductsSv(query);
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
// Lấy chi tiết sản phẩm theo slug
exports.getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    if (!slug) {
      return res.status(400).json({
        status: false,
        message: "Slug sản phẩm không hợp lệ",
      });
    }
    const product = await productService.getProductBySlugSv(slug);
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

