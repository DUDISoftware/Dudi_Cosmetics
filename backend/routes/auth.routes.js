const express = require("express");
const router = express.Router();
const { register, login, getAllUsers, getUserById, updateUser, deleteUser } = require("../controllers/auth.controller");
const { verifyToken, verifyAdmin } = require("../middleware/auth.middleware");

router.post("/register", register);
router.post("/login", login);

router.get("/users", verifyToken, verifyAdmin, getAllUsers);
router.get("/user-detail", verifyToken, getUserById);
router.put("/update-user", verifyToken, updateUser);
router.delete("/delete-user", verifyToken,verifyAdmin, deleteUser);
module.exports = router;
