const User = require('../models/User');
const Property = require('../models/Property');
const Activity = require('../models/Activity');
const backupService = require('../services/backup.service');

exports.getDashboardStats = async (req, res) => {
  try {
    const [
      totalUsers,
      totalProperties,
      pendingProperties,
      totalEnquiries
    ] = await Promise.all([
      User.countDocuments(),
      Property.countDocuments(),
      Property.countDocuments({ status: 'pending' }),
      Enquiry.countDocuments()
    ]);

    // Get recent activities
    const recentActivities = await Activity.find()
      .populate('user', 'name')
      .sort('-createdAt')
      .limit(10);

    res.json({
      stats: {
        totalUsers,
        totalProperties,
        pendingProperties,
        totalEnquiries
      },
      recentActivities
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// More admin controller methods... 