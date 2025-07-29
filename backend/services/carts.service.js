const Cart = require("../models/carts.model");
const CartItem = require("../models/cart_items.model");

const findOrCreateCartByUserId = async (userId) => {
  let cart = await Cart.findOne({ user_id: userId });
  if (!cart) {
    cart = await Cart.create({ user_id: userId });
  }
  return cart;
};

const removeItemsFromCart = async (cart_id, item_ids) => {
  const items = await CartItem.deleteMany({
    product_id: { $in: item_ids },
    cart_id
  });
  return items;
};

module.exports = {
  // ...các hàm cũ
  findOrCreateCartByUserId,
  removeItemsFromCart
};
