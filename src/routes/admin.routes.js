const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const auth = require('../middleware/auth');
const { checkRole } = require('../middleware/roleAuth');
const { roles } = require('../config/constants');

// All routes require authentication and admin role
router.use(auth, checkRole(roles.ADMIN));

// User management
router.get('/users', adminController.getAllUsers);
router.put('/users/:id', adminController.updateUser);
router.delete('/users/:id', adminController.deleteUser);

// Property management
router.get('/properties/pending', adminController.getPendingProperties);
router.put('/properties/:id/approve', adminController.approveProperty);
router.put('/properties/:id/reject', adminController.rejectProperty);

// Reports
router.get('/reports/users', adminController.getUsersReport);
router.get('/reports/properties', adminController.getPropertiesReport);
router.get('/reports/transactions', adminController.getTransactionsReport);

module.exports = router; 