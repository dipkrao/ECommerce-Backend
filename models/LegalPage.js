const mongoose = require('mongoose');

const legalPageSchema = new mongoose.Schema({
  pageType: {
    type: String,
    required: true,
    enum: ['privacy-policy', 'terms-of-service', 'cookie-policy'],
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  content: {
    sections: [{
      id: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      content: {
        type: String,
        required: true
      },
      subsections: [{
        id: {
          type: String,
          required: true
        },
        title: {
          type: String,
          required: true
        },
        content: {
          type: String,
          required: true
        }
      }]
    }]
  },
  meta: {
    description: String,
    keywords: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  version: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true
});

// Update lastUpdated when content changes
legalPageSchema.pre('save', function(next) {
  if (this.isModified('content')) {
    this.lastUpdated = new Date();
    this.version += 1;
  }
  next();
});

module.exports = mongoose.model('LegalPage', legalPageSchema);
