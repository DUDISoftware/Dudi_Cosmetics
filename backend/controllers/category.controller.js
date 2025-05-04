const Category = require('../models/Category');

// Lấy danh sách tất cả các loại sản phẩm
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate('brands');
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách loại sản phẩm', error });
  }
};

// Thêm mới một loại sản phẩm
exports.createCategory = async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tạo loại sản phẩm', error });
  }
};

// Cập nhật thông tin một loại sản phẩm
exports.updateCategory = async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCategory) {
      return res.status(404).json({ message: 'Không tìm thấy loại sản phẩm' });
    }
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi cập nhật loại sản phẩm', error });
  }
};

// Xóa một loại sản phẩm
exports.deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ message: 'Không tìm thấy loại sản phẩm' });
    }
    res.status(200).json({ message: 'Xóa loại sản phẩm thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xóa loại sản phẩm', error });
  }
};
