const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const propertyRoutes = require('./property.routes');
const userRoutes = require('./user.routes');
const adminRoutes = require('./admin.routes');
const reviewRoutes = require('./review.routes');
const enquiryRoutes = require('./enquiry.routes');

const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

// Public routes
router.use('/auth', authRoutes);
router.use('/properties', propertyRoutes);

// Protected routes
router.use('/users', auth, userRoutes);
router.use('/reviews', auth, reviewRoutes);
router.use('/enquiries', auth, enquiryRoutes);

// Admin routes
router.use('/admin', auth, checkRole(['admin']), adminRoutes);

module.exports = router; 