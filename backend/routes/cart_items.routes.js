const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth.middleware");
const cartItemController = require("../controllers/cart_items.controller");

router.post('/:userId/items', verifyToken, cartItemController.addItemToCart);
router.get('/:userId/items', verifyToken, cartItemController.getCartItemsByUserId); // ✅ OK
router.put('/:cartItemId', verifyToken, cartItemController.updateCartItem);
router.delete('/:cartItemId', verifyToken, cartItemController.deleteCartItem);

module.exports = router;
