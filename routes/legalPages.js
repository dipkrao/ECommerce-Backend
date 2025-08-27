const express = require('express');
const router = express.Router();
const { adminAuth } = require('../middleware/auth');
const {
  getAllLegalPages,
  getLegalPageByType,
  createLegalPage,
  updateLegalPage,
  deleteLegalPage,
  toggleLegalPageStatus,
  getPublicLegalPage
} = require('../controllers/legalPageController');

// Public routes (no authentication required)
router.get('/public/:pageType', getPublicLegalPage);

// Admin routes (require admin authentication)
router.use(adminAuth);

// Get all legal pages
router.get('/', getAllLegalPages);

// Get legal page by type
router.get('/:pageType', getLegalPageByType);

// Create new legal page
router.post('/', createLegalPage);

// Update legal page
router.put('/:pageType', updateLegalPage);

// Delete legal page
router.delete('/:pageType', deleteLegalPage);

// Toggle legal page status
router.patch('/:pageType/toggle', toggleLegalPageStatus);

module.exports = router;
