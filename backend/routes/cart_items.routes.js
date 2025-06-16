// cart_items.routes.js
const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth.middleware");
const cartItemController = require("../controllers/cart_items.controller");

// ✅ Route đúng phải có :userId
router.post('/:userId/items', verifyToken, cartItemController.addItemToCart);

module.exports = router;
