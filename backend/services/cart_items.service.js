const CartItem = require("../models/cart_items.model");
const { findOrCreateCartByUserId } = require("./carts.service");
const Product = require("../models/Product.model");
console.log("✅ Product model is:", Product); // thêm dòng này

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
    item.price = product.base_price * item.quantity; // ✅ cập nhật theo số lượng mới
    item.updated_at = Date.now();
    await item.save();
  } else {
    item = await CartItem.create({
      cart_id: cart._id,
      product_id: product._id,
      quantity,
      price: product.base_price * quantity, // ✅ dùng quantity
      product_name: product.product_name,
      product_image: product.image_url,
    });
  }

  return item;
};


const getItemsByUserId = async (userId) => {
  const cart = await findOrCreateCartByUserId(userId);
  if (!cart) throw new Error("Không tìm thấy hoặc tạo giỏ hàng");

  const items = await CartItem.find({ cart_id: cart._id }).populate('product_id');
  return items;
};

const removeItemFromCart = async (userId, productId) => {
  const cart = await findOrCreateCartByUserId(userId);
  if (!cart) throw new Error("Không tìm thấy hoặc tạo giỏ hàng");

  const item = await CartItem.findOneAndDelete({
    cart_id: cart._id,
    product_id: productId,
  });

  if (!item) throw new Error("Không tìm thấy sản phẩm trong giỏ hàng");
  return item;
};

const updateCartItem = async (cartItemId, quantity) => {
  const item = await CartItem.findById(cartItemId);
  if (!item) throw new Error("Không tìm thấy mục giỏ hàng");

  const product = await Product.findById(item.product_id);
  if (!product) throw new Error("Không tìm thấy sản phẩm");

  item.quantity = quantity;
  item.price = product.base_price * quantity;
  item.updated_at = Date.now();
  await item.save();

  return item;
};

module.exports = {
  addItemToCart,
  getItemsByUserId, // ✅ Thêm dòng này để export
  removeItemFromCart,
  updateCartItem
};
