const express = require("express");
const router = express.Router();
const { register, login, getAllUsers, getUserById, updateUser, deleteUser } = require("../controllers/auth.controller");
const { verifyToken, verifyAdmin } = require("../middleware/auth.middleware");
const { getProducts, createProduct, updateProduct, deleteProduct } = require("../controllers/Product.controller.js");
const { getCategories, createCategory, updateCategory, deleteCategory } = require("../controllers/category.controller");
const { getBrands, createBrand, updateBrand, deleteBrand } = require("../controllers/banners.controller.js");



router.post("/register", register);
router.post("/login", login);

// Auth routes
router.get("/users", verifyToken, verifyAdmin, getAllUsers);
router.get("/user-detail", verifyToken, getUserById);
router.put("/update-user", verifyToken, updateUser);
router.delete("/delete-user", verifyToken, verifyAdmin, deleteUser);


// Product routes
router.get("/products", verifyToken, getProducts);
router.post("/products", verifyToken, verifyAdmin, createProduct);
router.put("/products/:id", verifyToken, verifyAdmin, updateProduct);
router.delete("/products/:id", verifyToken, verifyAdmin, deleteProduct);

// Category routes
router.get("/categories", verifyToken, getCategories);
router.post("/categories", verifyToken, verifyAdmin, createCategory);
router.put("/categories/:id", verifyToken, verifyAdmin, updateCategory);
router.delete("/categories/:id", verifyToken, verifyAdmin, deleteCategory);

// Brand routes
router.get("/brands", verifyToken, getBrands);
router.post("/brands", verifyToken, verifyAdmin, createBrand);
router.put("/brands/:id", verifyToken, verifyAdmin, updateBrand);
router.delete("/brands/:id", verifyToken, verifyAdmin, deleteBrand);


module.exports = router;
