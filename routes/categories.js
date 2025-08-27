const express = require("express");
const router = express.Router();
const { adminAuth } = require("../middleware/auth");
const Category = require("../models/Category");

// Public routes (no authentication required)
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true }).sort({
      sortOrder: 1,
      name: 1,
    });

    // Get product count for each category
    const Product = require("../models/Product");
    const categoriesWithCount = await Promise.all(
      categories.map(async (category) => {
        const productCount = await Product.countDocuments({
          category: category._id,
          isActive: true,
        });
        return {
          ...category.toObject(),
          productCount,
        };
      })
    );

    res.json(categoriesWithCount);
  } catch (error) {
    console.error("Get categories error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Admin routes (require admin authentication)
router.use(adminAuth);

// Create category
router.post("/", async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    // Check if category with same name already exists
    const existingCategory = await Category.findOne({
      name: { $regex: new RegExp(`^${name}$`, "i") },
    });
    if (existingCategory) {
      return res
        .status(400)
        .json({ message: "Category with this name already exists" });
    }

    // Create new category
    const category = new Category({
      name,
      description: description || "",
    });

    await category.save();

    res.status(201).json({
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.error("Create category error:", error);
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Category with this name already exists" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update category
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    // Check if category exists
    const existingCategory = await Category.findById(id);
    if (!existingCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Check if new name conflicts with other categories
    const nameConflict = await Category.findOne({
      name: { $regex: new RegExp(`^${name}$`, "i") },
      _id: { $ne: id },
    });
    if (nameConflict) {
      return res
        .status(400)
        .json({ message: "Category with this name already exists" });
    }

    // Update category
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name, description: description || "" },
      { new: true, runValidators: true }
    );

    res.json({
      message: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (error) {
    console.error("Update category error:", error);
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Category with this name already exists" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete category
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Check if category exists
    const existingCategory = await Category.findById(id);
    if (!existingCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Check if category is being used by any products
    const Product = require("../models/Product");
    const productsUsingCategory = await Product.findOne({ category: id });
    if (productsUsingCategory) {
      return res.status(400).json({
        message: "Cannot delete category. It is being used by products.",
      });
    }

    // Delete category
    await Category.findByIdAndDelete(id);

    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Delete category error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
