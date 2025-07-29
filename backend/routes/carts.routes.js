const express = require("express");
const router = express.Router();
const cartItemController = require("../controllers/cart_items.controller");

// Thêm item vào giỏ hàng
router.post("/:userId/items", cartItemController.addItemToCart);
router.post("/:userId/items/:cartItemId", cartItemController.updateCartItem);
router.delete("/:userId/items/:cartItemId", cartItemController.deleteCartItem);

module.exports = router;
