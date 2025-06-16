const Cart = require("../models/carts.model");

const findOrCreateCartByUserId = async (userId) => {
  let cart = await Cart.findOne({ user_id: userId });
  if (!cart) {
    cart = await Cart.create({ user_id: userId });
  }
  return cart;
};

module.exports = {
  // ...các hàm cũ
  findOrCreateCartByUserId,
};
