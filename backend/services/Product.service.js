const Product = require('../models/Product.model');


// PCChild 
// PCParent 
// PCReviews 
// Lấy tất cả sản phẩm
exports.getAllProducts = async (filters = {}) => {
  try {
    return await Product.find(filters)
      .populate('category_id', 'name')
      .populate('brand_id', 'name')
      .populate('user_id', 'name email');
  } catch (error) {
    throw new Error("Lỗi khi lấy danh sách sản phẩm: " + error.message);
  }
};

// Lấy chi tiết sản phẩm
exports.getProductById = async (id) => {
  try {
    return await Product.findById(id)
      .populate('category_id')
      .populate('brand_id')
      .populate('user_id');
  } catch (error) {
    throw new Error("Lỗi khi lấy chi tiết sản phẩm: " + error.message);
  }
};

// Tạo sản phẩm mới
exports.createProduct = async (productData) => {
  try {
    const product = new Product(productData);
    return await product.save();
  } catch (error) {
    throw new Error("Lỗi khi tạo sản phẩm: " + error.message);
  }
};

// Cập nhật sản phẩm
exports.updateProduct = async (id, updateData) => {
  try {
    return await Product.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
  } catch (error) {
    throw new Error("Lỗi khi cập nhật sản phẩm: " + error.message);
  }
};

// Xóa sản phẩm
exports.deleteProduct = async (id) => {
  try {
    return await Product.findByIdAndDelete(id);
  } catch (error) {
    throw new Error("Lỗi khi xóa sản phẩm: " + error.message);
  }
};

// Lấy sản phẩm hot
exports.getHotProducts = async () => {
  try {
    return await Product.find({ is_hot: true })
      .populate('category_id')
      .populate('brand_id');
  } catch (error) {
    throw new Error("Lỗi khi lấy sản phẩm hot: " + error.message);
  }
};

// Tìm kiếm sản phẩm
exports.searchProducts = async (query) => {
  try {
    return await Product.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { short_description: { $regex: query, $options: 'i' } },
      ],
    }).populate('category_id brand_id');
  } catch (error) {
    throw new Error("Lỗi khi tìm kiếm sản phẩm: " + error.message);
  }
};


