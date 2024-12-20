const Activity = require('../models/Activity');

class ActivityService {
  async logActivity(data) {
    try {
      const activity = new Activity({
        user: data.userId,
        type: data.type,
        property: data.propertyId,
        details: data.details || {},
        ip: data.ip,
        userAgent: data.userAgent
      });

      await activity.save();
      return activity;
    } catch (error) {
      console.error('Activity log error:', error);
      throw error;
    }
  }

  async getUserActivities(userId, options = {}) {
    try {
      const query = { user: userId };
      if (options.type) query.type = options.type;

      const activities = await Activity.find(query)
        .sort('-createdAt')
        .limit(options.limit || 10)
        .populate('property', 'title');

      return activities;
    } catch (error) {
      console.error('Get user activities error:', error);
      throw error;
    }
  }

  async getPropertyActivities(propertyId) {
    try {
      const activities = await Activity.find({ property: propertyId })
        .sort('-createdAt')
        .populate('user', 'name');

      return activities;
    } catch (error) {
      console.error('Get property activities error:', error);
      throw error;
    }
  }
}

module.exports = new ActivityService(); 