const express = require("express");
const router = express.Router();
const { uploadImage } = require('../utils/cloudinary.util'); // Multer cấu hình cho Cloudinary
const { verifyToken, verifyAdmin } = require("../middleware/auth.middleware");
const { register, login, getAllUsers, getUserById, updateUser, deleteUser
} = require("../controllers/user.controller.js");
const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct ,getProductBySlug
} = require("../controllers/Product.controller.js");
const { createProductBrand, getAllProductBrands, getProductBrandById, updateProductBrand, deleteProductBrand
} = require("../controllers/ProductBrand.controller.js");
const { createPCChild, getAllPCChild, getPCChildById, updatePCChild, deletePCChild
} = require("../controllers/ProductCategoryChild.controller.js");
const { createPCParent, getAllPCParent, getPCParentId, updatePCParent, deletePCParent
} = require("../controllers/ProductCategoryParent.controller.js");
const { createCategoryPost, getAllCategoryPost, getCategoryPostSById, updateCategoryPost, deleteCategoryPost,
} = require("../controllers/PostCategory.controller.js");
const { createPost, getAllPost, getPostSById, updatePost, deletePost, getPostBySlug
} = require("../controllers/Posts.controller.js");
const { createBanner, getAllBanners, getBannerById, updateBanner, deleteBanner,
} = require("../controllers/banners.controller.js");
const { createVoucher, getAllVouchers, getVoucherById, updateVoucher, deleteVoucher,
} = require("../controllers/vouchers.controller.js");
const cartsRoutes = require('./carts.routes');
router.use('/carts', cartsRoutes); // ✅ Đây mới là nơi đúng để dùng router.use

const cartItemRoutes = require("./cart_items.routes.js");
router.use("/cart-items", cartItemRoutes); // ✅ Dùng router.use vì đây là router chính

const paymentRoutes = require('./payment.routes');
router.use('/payments', paymentRoutes);

// User routes
router.post("/users/register", register);
router.post("/users/login", login);
router.get("/users/users-list", verifyToken, verifyAdmin, getAllUsers);
router.get("/users/user-detail/:id", verifyToken, getUserById);
router.put("/users/update-user/:id", verifyToken, updateUser);
router.delete("/users/delete-user/:id", verifyToken, verifyAdmin, deleteUser);

// Product routes
router.post("/product/add-product", verifyToken, verifyAdmin, uploadImage.fields([
    { name: 'image_url', maxCount: 1 },
    { name: 'sub_images_urls', maxCount: 5 },
  ]), createProduct);
router.get("/Product/products-list", getAllProducts);
router.get('/Products-detail-by-slug/:slug', getProductBySlug);
router.get("/Product/products-detail/:id", getProductById);
router.put("/Product/update-products/:id", verifyToken, verifyAdmin,uploadImage.fields([
    { name: 'image_url', maxCount: 1 },
    { name: 'sub_images_urls', maxCount: 5 },
  ]), updateProduct);
router.delete("/Product/delete-products/:id", verifyToken, verifyAdmin, deleteProduct);

// ProductBrand routes
router.post("/ProductBrand/add-ProductBrand", verifyToken, verifyAdmin, uploadImage.single('image_url'), createProductBrand);
router.get("/ProductBrand/ProductBrand-list", getAllProductBrands);
router.get("/ProductBrand/ProductBrand-detail/:id", getProductBrandById);
router.put("/ProductBrand/update-ProductBrand/:id", verifyToken, verifyAdmin, uploadImage.single('image_url'), updateProductBrand);
router.delete("/ProductBrand/delete-ProductBrand/:id", verifyToken, verifyAdmin, deleteProductBrand);

// ProductCategoryParent routes
router.post("/PCParent/add-PCParent", verifyToken, verifyAdmin, createPCParent);
router.get("/PCParent/PCParent-list", getAllPCParent);
router.get("/PCParent/PCParent-detail/:id", getPCParentId);
router.put("/PCParent/update-PCParent/:id", verifyToken, verifyAdmin, updatePCParent);
router.delete("/PCParent/delete-PCParent/:id", verifyToken, verifyAdmin, deletePCParent);

// ProductCategoryChild routes
router.post("/PCChild/add-PCChild", verifyToken, verifyAdmin, createPCChild);
router.get("/PCChild/PCChild-list", getAllPCChild);
router.get("/PCChild/PCChild-detail/:id", getPCChildById);
router.put("/PCChild/update-PCChild/:id", verifyToken, verifyAdmin, updatePCChild);
router.delete("/PCChild/delete-PCChild/:id", verifyToken, verifyAdmin, deletePCChild);

// PostsCategory routes
router.post("/PostsCategory/add-PostsCategory", verifyToken, verifyAdmin, createCategoryPost);
router.get("/PostsCategory/PostsCategory-list", getAllCategoryPost);
router.get("/PostsCategory/PostsCategory-detail/:id", getCategoryPostSById);
router.put("/PostsCategory/update-PostsCategory/:id", verifyToken, verifyAdmin, updateCategoryPost);
router.delete("/PostsCategory/delete-PostsCategory/:id", verifyToken, verifyAdmin, deleteCategoryPost);

// Posts routes
router.post("/Posts/add-Posts", verifyToken, verifyAdmin, uploadImage.single('image_url'), createPost);
router.get("/Posts/Posts-list", getAllPost);
router.get("/Posts/Posts-detail/:id", getPostSById);
router.get('/Posts-detail-by-slug/:slug', getPostBySlug);
router.put("/Posts/update-Posts/:id", verifyToken, verifyAdmin, uploadImage.single('image_url'), updatePost);
router.delete("/Posts/delete-Posts/:id", verifyToken, verifyAdmin, deletePost);

// Banners routes
router.post("/Banners/add-Banners", verifyToken, verifyAdmin, uploadImage.single('image'), createBanner);
router.get("/Banners/Banners-list", getAllBanners);
router.get("/Banners/Banners-detail/:id", getBannerById);
router.put("/Banners/update-Banners/:id", verifyToken, verifyAdmin, uploadImage.single('image'), updateBanner);
router.delete("/Banners/delete-Banners/:id", verifyToken, verifyAdmin, deleteBanner);

// Vouchers routes
router.post("/Vouchers/add-Vouchers", verifyToken, verifyAdmin, createVoucher);
router.get("/Vouchers/Vouchers-list", getAllVouchers);
router.get("/Vouchers/Vouchers-detail/:id", getVoucherById);
router.put("/Vouchers/update-Vouchers/:id", verifyToken, verifyAdmin, updateVoucher);
router.delete("/Vouchers/delete-Vouchers/:id", verifyToken, verifyAdmin, deleteVoucher);


module.exports = router;
