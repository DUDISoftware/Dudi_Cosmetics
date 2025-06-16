// services/cart_items.service.js

const CartItem = require("../models/cart_items.model");
const { findOrCreateCartByUserId } = require("./carts.service");
const Product = require("../models/Product.model");

const addItemToCart = async (userId, productId, quantity) => {
  const cart = await findOrCreateCartByUserId(userId);

  let item = await CartItem.findOne({
    cart_id: cart._id,
    product_id: productId,
  });

  const product = await Product.findById(productId);
  if (!product) throw new Error("Sản phẩm không tồn tại");

  if (item) {
    item.quantity += quantity;
    item.price = product.base_price * item.quantity; // ✅ cập nhật giá
    item.updated_at = Date.now();
    await item.save();
  }
  else {
    item = await CartItem.create({
      cart_id: cart._id,
      product_id: product._id,
      quantity,
      price: product.base_price,
      product_name: product.product_name,
      product_image: product.image_url,
    });
  }

  return item;
};

// ✅ Thêm dòng này để export hàm
module.exports = {
  addItemToCart,
};
