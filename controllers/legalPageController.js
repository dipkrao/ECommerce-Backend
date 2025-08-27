const LegalPage = require('../models/LegalPage');

// Get all legal pages
const getAllLegalPages = async (req, res) => {
  try {
    const legalPages = await LegalPage.find({ isActive: true }).sort({ pageType: 1 });
    res.json(legalPages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching legal pages', error: error.message });
  }
};

// Get legal page by type
const getLegalPageByType = async (req, res) => {
  try {
    const { pageType } = req.params;
    const legalPage = await LegalPage.findOne({ pageType, isActive: true });
    
    if (!legalPage) {
      return res.status(404).json({ message: 'Legal page not found' });
    }
    
    res.json(legalPage);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching legal page', error: error.message });
  }
};

// Create new legal page
const createLegalPage = async (req, res) => {
  try {
    const { pageType, title, content, meta } = req.body;
    
    // Check if page type already exists
    const existingPage = await LegalPage.findOne({ pageType });
    if (existingPage) {
      return res.status(400).json({ message: 'Legal page type already exists' });
    }
    
    const legalPage = new LegalPage({
      pageType,
      title,
      content,
      meta
    });
    
    await legalPage.save();
    res.status(201).json(legalPage);
  } catch (error) {
    res.status(500).json({ message: 'Error creating legal page', error: error.message });
  }
};

// Update legal page
const updateLegalPage = async (req, res) => {
  try {
    const { pageType } = req.params;
    const { title, content, meta, isActive } = req.body;
    
    const legalPage = await LegalPage.findOne({ pageType });
    if (!legalPage) {
      return res.status(404).json({ message: 'Legal page not found' });
    }
    
    // Update fields
    if (title !== undefined) legalPage.title = title;
    if (content !== undefined) legalPage.content = content;
    if (meta !== undefined) legalPage.meta = meta;
    if (isActive !== undefined) legalPage.isActive = isActive;
    
    await legalPage.save();
    res.json(legalPage);
  } catch (error) {
    res.status(500).json({ message: 'Error updating legal page', error: error.message });
  }
};

// Delete legal page
const deleteLegalPage = async (req, res) => {
  try {
    const { pageType } = req.params;
    const legalPage = await LegalPage.findOne({ pageType });
    
    if (!legalPage) {
      return res.status(404).json({ message: 'Legal page not found' });
    }
    
    await LegalPage.deleteOne({ pageType });
    res.json({ message: 'Legal page deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting legal page', error: error.message });
  }
};

// Toggle legal page status
const toggleLegalPageStatus = async (req, res) => {
  try {
    const { pageType } = req.params;
    const legalPage = await LegalPage.findOne({ pageType });
    
    if (!legalPage) {
      return res.status(404).json({ message: 'Legal page not found' });
    }
    
    legalPage.isActive = !legalPage.isActive;
    await legalPage.save();
    
    res.json(legalPage);
  } catch (error) {
    res.status(500).json({ message: 'Error toggling legal page status', error: error.message });
  }
};

// Get legal page content for public access
const getPublicLegalPage = async (req, res) => {
  try {
    const { pageType } = req.params;
    const legalPage = await LegalPage.findOne({ pageType, isActive: true });
    
    if (!legalPage) {
      return res.status(404).json({ message: 'Legal page not found or inactive' });
    }
    
    // Only return public content (no sensitive admin fields)
    const publicPage = {
      pageType: legalPage.pageType,
      title: legalPage.title,
      lastUpdated: legalPage.lastUpdated,
      content: legalPage.content,
      meta: legalPage.meta
    };
    
    res.json(publicPage);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching legal page', error: error.message });
  }
};

module.exports = {
  getAllLegalPages,
  getLegalPageByType,
  createLegalPage,
  updateLegalPage,
  deleteLegalPage,
  toggleLegalPageStatus,
  getPublicLegalPage
};
