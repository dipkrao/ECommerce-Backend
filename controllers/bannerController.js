const Banner = require('../models/Banner');
const fs = require('fs');
const path = require('path');

// Get all banners (admin)
const getAllBanners = async (req, res) => {
  try {
    const banners = await Banner.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: banners });
  } catch (error) {
    console.error('Error fetching banners:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch banners' });
  }
};

// Get active banners (public)
const getActiveBanners = async (req, res) => {
  try {
    const now = new Date();
    const banners = await Banner.find({
      isActive: true,
      $or: [
        { startDate: { $lte: now } },
        { startDate: { $exists: false } }
      ],
      $or: [
        { endDate: { $gte: now } },
        { endDate: { $exists: false } },
        { endDate: null }
      ]
    }).sort({ order: 1, createdAt: -1 });
    
    res.json({ success: true, data: banners });
  } catch (error) {
    console.error('Error fetching active banners:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch banners' });
  }
};

// Get single banner
const getBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) {
      return res.status(404).json({ success: false, message: 'Banner not found' });
    }
    res.json({ success: true, data: banner });
  } catch (error) {
    console.error('Error fetching banner:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch banner' });
  }
};

// Create banner
const createBanner = async (req, res) => {
  try {
    const { title, description, link, buttonText, isActive, order, startDate, endDate } = req.body;
    
    // Handle image upload
    let imagePath = null;
    if (req.file) {
      imagePath = `/uploads/banners/${req.file.filename}`;
    } else {
      return res.status(400).json({ success: false, message: 'Banner image is required' });
    }

    const banner = new Banner({
      title,
      description,
      image: imagePath,
      link,
      buttonText,
      isActive: isActive !== undefined ? isActive : true,
      order: order || 0,
      startDate: startDate || new Date(),
      endDate: endDate || null
    });

    await banner.save();
    res.status(201).json({ success: true, data: banner });
  } catch (error) {
    console.error('Error creating banner:', error);
    res.status(500).json({ success: false, message: 'Failed to create banner' });
  }
};

// Update banner
const updateBanner = async (req, res) => {
  try {
    const { title, description, link, buttonText, isActive, order, startDate, endDate } = req.body;
    
    const updateData = {
      title,
      description,
      link,
      buttonText,
      isActive,
      order,
      startDate,
      endDate
    };

    // Handle image upload if new image is provided
    if (req.file) {
      updateData.image = `/uploads/banners/${req.file.filename}`;
      
      // Delete old image if exists
      const oldBanner = await Banner.findById(req.params.id);
      if (oldBanner && oldBanner.image) {
        const oldImagePath = path.join(__dirname, '..', '..', oldBanner.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
    }

    const banner = await Banner.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!banner) {
      return res.status(404).json({ success: false, message: 'Banner not found' });
    }

    res.json({ success: true, data: banner });
  } catch (error) {
    console.error('Error updating banner:', error);
    res.status(500).json({ success: false, message: 'Failed to update banner' });
  }
};

// Delete banner
const deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) {
      return res.status(404).json({ success: false, message: 'Banner not found' });
    }

    // Delete image file
    if (banner.image) {
      const imagePath = path.join(__dirname, '..', '..', banner.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Banner.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Banner deleted successfully' });
  } catch (error) {
    console.error('Error deleting banner:', error);
    res.status(500).json({ success: false, message: 'Failed to delete banner' });
  }
};

// Toggle banner status
const toggleBannerStatus = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) {
      return res.status(404).json({ success: false, message: 'Banner not found' });
    }

    banner.isActive = !banner.isActive;
    await banner.save();

    res.json({ success: true, data: banner });
  } catch (error) {
    console.error('Error toggling banner status:', error);
    res.status(500).json({ success: false, message: 'Failed to toggle banner status' });
  }
};

// Reorder banners
const reorderBanners = async (req, res) => {
  try {
    const { bannerOrders } = req.body; // Array of { id, order }
    
    for (const item of bannerOrders) {
      await Banner.findByIdAndUpdate(item.id, { order: item.order });
    }

    const banners = await Banner.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: banners });
  } catch (error) {
    console.error('Error reordering banners:', error);
    res.status(500).json({ success: false, message: 'Failed to reorder banners' });
  }
};

module.exports = {
  getAllBanners,
  getActiveBanners,
  getBanner,
  createBanner,
  updateBanner,
  deleteBanner,
  toggleBannerStatus,
  reorderBanners
};
