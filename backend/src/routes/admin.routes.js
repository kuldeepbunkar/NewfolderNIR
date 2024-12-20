const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const cache = require('../middleware/cache');

// Dashboard & Analytics
router.get('/stats', cache.cacheMiddleware(300), adminController.getDashboardStats);
router.get('/analytics', adminController.getAnalytics);

// User Management
router.get('/users', adminController.getAllUsers);
router.get('/users/:id', adminController.getUserById);
router.put('/users/:id', adminController.updateUser);
router.delete('/users/:id', adminController.deleteUser);

// Property Management
router.get('/properties/pending', adminController.getPendingProperties);
router.put('/properties/:id/verify', adminController.verifyProperty);
router.put('/properties/:id/reject', adminController.rejectProperty);

// System Management
router.get('/activities', adminController.getActivities);
router.get('/logs', adminController.getSystemLogs);
router.post('/backup', adminController.createBackup);
router.post('/restore', adminController.restoreBackup);

// Settings
router.get('/settings', adminController.getSettings);
router.put('/settings', adminController.updateSettings);

module.exports = router; 