const Brand = require('../models/Brand');

// Lấy danh sách tất cả các hãng
exports.getBrands = async (req, res) => {
  try {
    const brands = await Brand.find().populate('products category');
    res.status(200).json(brands);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách hãng', error });
  }
};

// Thêm mới một hãng sản xuất
exports.createBrand = async (req, res) => {
  try {
    const newBrand = new Brand(req.body);
    await newBrand.save();
    res.status(201).json(newBrand);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tạo hãng sản xuất', error });
  }
};

// Cập nhật thông tin hãng
exports.updateBrand = async (req, res) => {
  try {
    const updatedBrand = await Brand.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBrand) {
      return res.status(404).json({ message: 'Không tìm thấy hãng sản xuất' });
    }
    res.status(200).json(updatedBrand);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi cập nhật hãng sản xuất', error });
  }
};

// Xóa một hãng
exports.deleteBrand = async (req, res) => {
  try {
    const deletedBrand = await Brand.findByIdAndDelete(req.params.id);
    if (!deletedBrand) {
      return res.status(404).json({ message: 'Không tìm thấy hãng sản xuất' });
    }
    res.status(200).json({ message: 'Xóa hãng sản xuất thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xóa hãng sản xuất', error });
  }
};
