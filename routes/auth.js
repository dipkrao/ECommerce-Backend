const express = require("express");
const router = express.Router();
const {
  userRegister,
  userLogin,
  adminLogin,
  getProfile,
  updateProfile,
  changePassword,
  logout,
} = require("../controllers/authController");
const { auth } = require("../middleware/auth");

// Public routes
router.post("/register", userRegister);
router.post("/login", userLogin);
router.post("/admin/login", adminLogin);
router.post("/logout", logout);

// Protected routes
router.get("/profile", auth, getProfile);
router.put("/profile", auth, updateProfile);
router.put("/change-password", auth, changePassword);

module.exports = router;
