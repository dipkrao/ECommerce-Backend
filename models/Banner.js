const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500
  },
  image: {
    type: String,
    required: true
  },
  link: {
    type: String,
    trim: true,
    default: null
  },
  buttonText: {
    type: String,
    trim: true,
    maxlength: 50,
    default: 'Shop Now'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Index for active banners ordered by priority
bannerSchema.index({ isActive: 1, order: 1 });

// Virtual for checking if banner is currently active based on dates
bannerSchema.virtual('isCurrentlyActive').get(function() {
  const now = new Date();
  const isInDateRange = (!this.startDate || now >= this.startDate) && 
                       (!this.endDate || now <= this.endDate);
  return this.isActive && isInDateRange;
});

// Ensure virtual fields are serialized
bannerSchema.set('toJSON', { virtuals: true });
bannerSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Banner', bannerSchema);
