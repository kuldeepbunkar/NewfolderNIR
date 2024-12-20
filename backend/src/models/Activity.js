const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['login', 'property_view', 'property_create', 'property_update', 
           'review_create', 'profile_update', 'contact_agent'],
    required: true
  },
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property'
  },
  details: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  ip: String,
  userAgent: String,
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 2592000 // Auto delete after 30 days
  }
}, {
  timestamps: true
});

// Index for quick lookups
activitySchema.index({ user: 1, type: 1, createdAt: -1 });
activitySchema.index({ property: 1, type: 1 });

module.exports = mongoose.model('Activity', activitySchema); 