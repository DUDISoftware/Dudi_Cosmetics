const express = require("express");
const router = express.Router();
const { register, login, getAllUsers, getUserById, updateUser, deleteUser } = require("../controllers/auth.controller.js");
const { verifyToken, verifyAdmin } = require("../middleware/auth.middleware.js");
const { getProducts, createProduct, updateProduct, deleteProduct } = require("../controllers/Product.controller.js");
const { createProductBrand, getAllProductBrands, getProductBrandById, updateProductBrand, deleteProductBrand } = require("../controllers/ProductBrand.controller.js");




router.post("/register", register);
router.post("/login", login);

// Auth routes
router.get("/users", verifyToken, verifyAdmin, getAllUsers);
router.get("/user-detail", verifyToken, getUserById);
router.put("/update-user", verifyToken, updateUser);
router.delete("/delete-user", verifyToken, verifyAdmin, deleteUser);


// Product routes
router.get("/products-list", verifyToken, getProducts);
router.get("/products-detail", verifyToken, getUserById);
router.post("/product/add-product", verifyToken, verifyAdmin, createProduct);
router.put("/products/:id", verifyToken, verifyAdmin, updateProduct);
router.delete("/products/:id", verifyToken, verifyAdmin, deleteProduct);

// Product routes
router.get("/ProductBrand/ProductBrand-list", verifyToken, getAllProductBrands);
router.get("/ProductBrand/ProductBrand-detail", verifyToken, getProductBrandById);
router.post("/ProductBrand/ProductBrand/add-ProductBrand", verifyToken, verifyAdmin, createProductBrand);
router.put("/ProductBrand/ProductBrand/:id", verifyToken, verifyAdmin, updateProductBrand);
router.delete("/ProductBrand/ProductBrand/:id", verifyToken, verifyAdmin, deleteProductBrand);




module.exports = router;
