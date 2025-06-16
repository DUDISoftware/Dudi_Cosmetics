const cartItemsService = require("../services/cart_items.service");
const Product = require("../models/Product.model"); // THÊM DÒNG NÀY nếu chưa có

const addItemToCart = async (req, res) => {
  const { userId } = req.params;
  const { product_id, quantity } = req.body;

  try {
    const item = await cartItemsService.addItemToCart(userId, product_id, quantity);
    res.status(200).json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getCartItemsByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const items = await cartItemsService.getItemsByUserId(userId);
    res.status(200).json({ data: items });
  } catch (err) {
    console.error("❌ Lỗi khi lấy giỏ hàng:", err); // In chi tiết lỗi ra console
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};
const updateCartItem = async (req, res) => {
  const { cartItemId } = req.params;
  const { quantity } = req.body;

  try {
    const item = await CartItem.findById(cartItemId);
    if (!item) return res.status(404).json({ message: "Không tìm thấy mục giỏ hàng" });

    const product = await Product.findById(item.product_id);
    if (!product) return res.status(404).json({ message: "Không tìm thấy sản phẩm" });

    item.quantity = quantity;
    item.price = product.base_price * quantity;
    item.updated_at = Date.now();
    await item.save();

    res.status(200).json({ data: item });
  } catch (err) {
    res.status(500).json({ message: "Lỗi cập nhật", error: err.message });
  }
};
const deleteCartItem = async (req, res) => {
  const { cartItemId } = req.params;
  try {
    await CartItem.findByIdAndDelete(cartItemId);
    res.status(200).json({ message: "Đã xoá sản phẩm khỏi giỏ hàng" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi xoá sản phẩm", error: err.message });
  }
};

module.exports = {
  addItemToCart,
  getCartItemsByUserId,
  updateCartItem,
  deleteCartItem
};
