const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { body, validationResult } = require('express-validator');
const { adminAuth } = require('../middleware/auth');
const bannerController = require('../controllers/bannerController');

// Create uploads/banners directory if it doesn't exist
const uploadsDir = path.join(__dirname, '..', '..', 'uploads');
const bannersDir = path.join(uploadsDir, 'banners');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}
if (!fs.existsSync(bannersDir)) {
  fs.mkdirSync(bannersDir);
}

// Configure multer for banner image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, bannersDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'banner-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

// Validation middleware
const validateBanner = [
  body('title').trim().isLength({ min: 1, max: 100 }).withMessage('Title is required and must be less than 100 characters'),
  body('description').trim().isLength({ min: 1, max: 500 }).withMessage('Description is required and must be less than 500 characters'),
  body('link').optional().isURL().withMessage('Link must be a valid URL'),
  body('buttonText').optional().isLength({ max: 50 }).withMessage('Button text must be less than 50 characters'),
  body('order').optional().isInt({ min: 0 }).withMessage('Order must be a non-negative integer'),
  body('startDate').optional().isISO8601().withMessage('Start date must be a valid date'),
  body('endDate').optional().isISO8601().withMessage('End date must be a valid date')
];

// Public routes
router.get('/active', bannerController.getActiveBanners);

// Protected routes (admin only)
router.use(adminAuth);

// Get all banners (admin)
router.get('/', bannerController.getAllBanners);

// Get single banner
router.get('/:id', bannerController.getBanner);

// Create banner
router.post('/', upload.single('image'), validateBanner, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
}, bannerController.createBanner);

// Update banner
router.put('/:id', upload.single('image'), validateBanner, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
}, bannerController.updateBanner);

// Delete banner
router.delete('/:id', bannerController.deleteBanner);

// Toggle banner status
router.patch('/:id/toggle', bannerController.toggleBannerStatus);

// Reorder banners
router.post('/reorder', bannerController.reorderBanners);

module.exports = router;
