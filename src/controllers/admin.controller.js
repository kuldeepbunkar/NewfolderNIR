const User = require('../models/User');
const Property = require('../models/Property');
const { generateReport } = require('../utils/reports');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getPendingProperties = async (req, res) => {
  try {
    const properties = await Property.find({ status: 'pending' })
      .populate('owner', 'name email');
    res.json(properties);
  } catch (error) {
    console.error('Get pending properties error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.approveProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      { status: 'approved' },
      { new: true }
    );
    res.json(property);
  } catch (error) {
    console.error('Approve property error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getUsersReport = async (req, res) => {
  try {
    const report = await generateReport('users');
    res.json(report);
  } catch (error) {
    console.error('Generate users report error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}; 