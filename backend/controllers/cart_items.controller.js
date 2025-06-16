//cart_item controller 
const cartItemsService = require("../services/cart_items.service");

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

module.exports = {
  addItemToCart,
  // ...các controller khác
};
