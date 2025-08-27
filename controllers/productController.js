const Product = require('../models/Product');
const Category = require('../models/Category');

// Get all products with pagination and filters
const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const category = req.query.category || '';
    const status = req.query.status || '';

    const filter = {};

    // Search filter
    if (search) {
      filter.$text = { $search: search };
    }

    // Category filter
    if (category) {
      filter.category = category;
    }

    // Status filter
    if (status) {
      filter.isActive = status === 'active';
    }

    const skip = (page - 1) * limit;

    const products = await Product.find(filter)
      .populate('category', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments(filter);

    res.json({
      products,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit
      }
    });

  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get single product
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category', 'name');

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);

  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Create new product
const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      comparePrice,
      category,
      stock,
      sku,
      tags,
      weight,
      dimensions,
      variants
    } = req.body;

    // Validate required fields
    if (!name || !description || !price || !category) {
      return res.status(400).json({ message: 'Name, description, price, and category are required' });
    }

    // Check if category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ message: 'Invalid category' });
    }

    // Generate SKU if not provided
    let productSku = sku;
    if (!productSku) {
      const timestamp = Date.now().toString().slice(-6);
      productSku = `${name.substring(0, 3).toUpperCase()}${timestamp}`;
    }

    // Check if SKU already exists
    const existingSku = await Product.findOne({ sku: productSku });
    if (existingSku) {
      return res.status(400).json({ message: 'SKU already exists' });
    }

    // Handle images - support both file uploads and URL strings
    let productImages = [];
    
    if (req.files && req.files.length > 0) {
      // If files were uploaded, use file paths
      productImages = req.files.map(file => file.path);
    } else if (req.body.images && Array.isArray(req.body.images)) {
      // If images were sent as URLs, filter out empty ones
      productImages = req.body.images.filter(img => img && img.trim() !== '');
    }

    const product = new Product({
      name,
      description,
      price,
      comparePrice,
      category,
      stock: stock || 0,
      sku: productSku,
      tags: tags || [],
      weight,
      dimensions,
      variants: variants || [],
      images: productImages
    });

    await product.save();

    const populatedProduct = await Product.findById(product._id)
      .populate('category', 'name');

    res.status(201).json({
      message: 'Product created successfully',
      product: populatedProduct
    });

  } catch (error) {
    console.error('Create product error:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Product with this name already exists' });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update product
const updateProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      comparePrice,
      category,
      stock,
      sku,
      tags,
      weight,
      dimensions,
      variants,
      isActive,
      isFeatured
    } = req.body;

    const updates = {};

    if (name !== undefined) updates.name = name;
    if (description !== undefined) updates.description = description;
    if (price !== undefined) updates.price = price;
    if (comparePrice !== undefined) updates.comparePrice = comparePrice;
    if (category !== undefined) updates.category = category;
    if (stock !== undefined) updates.stock = stock;
    if (sku !== undefined) updates.sku = sku;
    if (tags !== undefined) updates.tags = tags;
    if (weight !== undefined) updates.weight = weight;
    if (dimensions !== undefined) updates.dimensions = dimensions;
    if (variants !== undefined) updates.variants = variants;
    if (isActive !== undefined) updates.isActive = isActive;
    if (isFeatured !== undefined) updates.isFeatured = isFeatured;

    // Handle images - support both file uploads and URL updates
    if (req.files && req.files.length > 0) {
      // If files were uploaded, add them to existing images
      const newImages = req.files.map(file => file.path);
      updates.$push = { images: { $each: newImages } };
    } else if (req.body.images !== undefined) {
      // If images were sent as URLs, replace all images
      if (Array.isArray(req.body.images)) {
        updates.images = req.body.images.filter(img => img && img.trim() !== '');
      }
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    ).populate('category', 'name');

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({
      message: 'Product updated successfully',
      product
    });

  } catch (error) {
    console.error('Update product error:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Product with this name or SKU already exists' });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });

  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Toggle product status
const toggleProductStatus = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.isActive = !product.isActive;
    await product.save();

    res.json({
      message: `Product ${product.isActive ? 'activated' : 'deactivated'} successfully`,
      product
    });

  } catch (error) {
    console.error('Toggle product status error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get product statistics
const getProductStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const activeProducts = await Product.countDocuments({ isActive: true });
    const inactiveProducts = await Product.countDocuments({ isActive: false });
    const lowStockProducts = await Product.countDocuments({ stock: { $lt: 10 } });
    const outOfStockProducts = await Product.countDocuments({ stock: 0 });

    res.json({
      totalProducts,
      activeProducts,
      inactiveProducts,
      lowStockProducts,
      outOfStockProducts
    });

  } catch (error) {
    console.error('Get product stats error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  toggleProductStatus,
  getProductStats
};
