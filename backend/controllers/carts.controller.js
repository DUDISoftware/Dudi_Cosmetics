// controllers/carts.controller.js
const Product = require("../models/Product.model");
const Cart = require("../models/carts.model");
const CartItem = require("../models/cart_items.model");

exports.addItemToCart = async (req, res) => {
  const { userId } = req.params;
  const { product_id, quantity } = req.body;

  try {
    if (!product_id || !quantity || !userId) {
      return res.status(400).json({ message: "Thiếu thông tin sản phẩm hoặc số lượng hoặc userId." });
    }

    const product = await Product.findById(product_id);
    if (!product) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại." });
    }

    let cart = await Cart.findOne({ user_id: userId });
    if (!cart) {
      cart = await Cart.create({ user_id: userId, created_at: new Date(), updated_at: new Date() });
    }

    let cartItem = await CartItem.findOne({ cart_id: cart._id, product_id });

    if (cartItem) {
      cartItem.quantity += quantity;
      cartItem.updated_at = new Date();
      await cartItem.save();
    } else {
      await CartItem.create({
        cart_id: cart._id,
        product_id,
        quantity,
        price: product.base_price || 0,
        product_name: product.product_name,
        product_image: product.image_url,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    cart.updated_at = new Date();
    await cart.save();

    res.status(200).json({ message: "Đã thêm vào giỏ hàng thành công." });
  } catch (err) {
    console.error("❌ Lỗi thêm giỏ hàng:", err);
    res.status(500).json({ message: "Lỗi server khi thêm giỏ hàng.", error: err.message });
  }
};
