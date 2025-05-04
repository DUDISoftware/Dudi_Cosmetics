const Product = require('../models/Product');

// Lấy danh sách tất cả các sản phẩm
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category brand');
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách sản phẩm', error });
  }
};

// Thêm mới một sản phẩm
exports.createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tạo sản phẩm', error });
  }
};

// Cập nhật thông tin sản phẩm
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi cập nhật sản phẩm', error });
  }
};

// Xóa một sản phẩm
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }
    res.status(200).json({ message: 'Xóa sản phẩm thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xóa sản phẩm', error });
  }
};
